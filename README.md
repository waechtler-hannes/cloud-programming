# Serverless Static Website Hosting on AWS

Dieses Projekt implementiert eine hochverfügbare, globale und kosteneffiziente Bereitstellung einer statischen Webanwendung auf AWS mittels Amazon S3, Amazon CloudFront und einer automatisierten GitHub Actions CI/CD-Pipeline. Die gesamte Infrastruktur wird deklarativ über Terraform verwaltet.

---

## Architektur-Übersicht

* **Amazon S3 (Simple Storage Service):** Dient als Objektspeicher für die statischen Assets der Website (HTML, CSS, JS). Der direkte öffentliche Zugriff auf den Bucket ist vollständig gesperrt (*Block Public Access*).
* **Amazon CloudFront:** Globales Content Delivery Network (CDN), das Anfragen an weltweiten Edge Locations zwischenspeichert und Latenzen minimiert.
* **Origin Access Control (OAC):** Stellt sicher, dass Lesezugriffe auf den S3-Bucket ausschließlich über die autorisierte CloudFront-Distribution erfolgen.
* **GitHub Actions:** Vollautomatische CI/CD-Pipeline zum Bauen der Webanwendung, Synchronisieren der Distribution-Assets nach S3 und Auslösen von Cache-Invalidierungen.
* **Terraform:** Verwaltet die Bereitstellung, Konfiguration und Bereinigung aller Cloud-Ressourcen als Infrastructure as Code (IaC).

```text
[Nutzer weltweit] 
       │ (HTTPS)
       ▼
[CloudFront CDN (Edge Caches)] 
       │ (OAC / Authenticated)
       ▼
[Amazon S3 Bucket (Privat)]
```

---

## Voraussetzungen

* **AWS Account:** Berechtigungen für S3 und CloudFront.
* **AWS CLI (v2):** Für Authentifizierung und administrative Aufgaben.
* **Terraform (>= 1.5):** Zum Verwalten der Cloud-Infrastruktur.
* **Git & GitHub Repository:** Zur Versionskontrolle und Pipeline-Ausführung.
* **Node.js (>= 20) & npm:** Für lokale Entwicklung und lokale Builds (optional für reine IaC-Deployments).

---

## CI/CD Pipeline (GitHub Actions)

Deployments werden über die Workflow-Datei `.github/workflows/deploy.yml` abgewickelt.

### Benötigte Repository Secrets
Hinterlege in den GitHub-Repository-Einstellungen (*Settings* → *Secrets and variables* → *Actions*) folgende Zugangsdaten:

* `AWS_ACCESS_KEY_ID`: IAM Access Key des Bereitstellungsnutzers.
* `AWS_SECRET_ACCESS_KEY`: IAM Secret Access Key des Bereitstellungsnutzers.

### Funktionsweise der Pipeline
* **Trigger:** Jeder Push auf den Branch `main`, der Änderungen im Verzeichnis `website` enthält.
* **Dynamische Parameter:** Der Workflow liest Region und Bucket-Name direkt aus `terraform/terraform.tfvars.json` via `jq`. Die passende CloudFront-Distribution wird anschließend automatisch über die AWS CLI anhand des Bucket-Namens ermittelt.
* **Build & Sync:** Node.js baut die Produktions-Assets mit `npm run build`, die anschließend mit `aws s3 sync --delete` in den S3-Bucket geladen werden.
* **Cache Invalidation:** CloudFront erhält automatisch einen Invalidation-Request, sodass Änderungen sofort weltweit sichtbar sind.

---

## Installations-Guide

### 1. AWS CLI einrichten & authentifizieren
1. Installiere die AWS CLI für dein Betriebssystem.
2. Konfiguriere deine Anmeldedaten im Terminal:
   ```bash
   aws configure
   ```
   * Trage deine `AWS Access Key ID` und den `AWS Secret Access Key` ein.
   * Wähle deine Standardregion (z. B. `eu-central-1`).
   * Output-Format: `json`.

### 2. Terraform installieren
1. Installiere Terraform über den Paketmanager deiner Wahl.
2. Überprüfe die Installation:
   ```bash
   terraform -version
   ```

### 3. Node.js & npm (nur für lokale Entwicklung)
1. Installiere Node.js (LTS-Version empfohlen):
   ```bash
   node -v
   npm -v
   ```
2. Im Verzeichnis `website` können lokale Tests gestartet werden:
   ```bash
   cd website
   npm install
   npm run dev      # Lokaler Entwicklungsserver
   npm run build    # Lokaler Produktions-Build
   ```

---

## Infrastruktur verwalten (Terraform)

Die Bereitstellung und der Abbau der AWS-Ressourcen erfolgen vollständig über Terraform.

### 1. Konfiguration definieren
Passe die Werte in `terraform/terraform.tfvars.json` an. Diese Datei dient als *Single Source of Truth* für Terraform und die GitHub Actions Pipeline:

```json
{
  "bucket_name": "s3-cloud-programming",
  "region": "eu-central-1",
  "price_class": "PriceClass_All"
}
```

### 2. Infrastruktur hochfahren (Deploy)
1. In das Terraform-Verzeichnis wechseln:
   ```bash
   cd terraform
   ```
2. Provider initialisieren:
   ```bash
   terraform init
   ```
3. Geplante Änderungen prüfen:
   ```bash
   terraform plan
   ```
4. Ressourcen erstellen:
   ```bash
   terraform apply
   ```
   Bestätige die Abfrage mit `yes`. Die Erstellung der CloudFront-Distribution benötigt in der Regel etwa 3 Minuten. Nach Fertigstellung werden Bucket-Name und CloudFront-Domain in der Konsole ausgegeben.

### 3. Infrastruktur herunterfahren & bereinigen (Teardown)
Rückstandsfreies entfernen aller Ressourcen:
```bash
cd terraform
terraform destroy
```
Bestätige den Vorgang mit `yes`.

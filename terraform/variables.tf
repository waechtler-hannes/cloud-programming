variable "bucket_name" {
    description = "S3-Bucket Name"
    type = string
    default = "s3-bucket-cloud-programming"
}

variable "region" {
    description = "AWS Region"
    type = string
    default = "eu-central-1"
}

variable "price_class" {
    description = "CloudFront Distribution Price Class"
    type = string
    default = "PriceClass_100"
}
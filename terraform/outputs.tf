output "s3_bucket_name" {
  description = "S3-Bucket Name"
  value       = aws_s3_bucket.cp.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = aws_cloudfront_distribution.s3_distribution.id
}
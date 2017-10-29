# A Simple, Rock Solid Web Infrastructure

I've been thinking through how to build a rock solid, super fast, !!!!
super inexpensive web infrastructure for quite a while.
I recently got all the pieces working together. 
It's amazing what you can do on Amazon for dirt cheap.

Here is the feature set.

* Blazing fast CDN for static pieces
* Secure, never have to copy keys/passwords around
* High quality SSL CERT with automated renewal
* Email alerts if SSL CERT gets too near expiration
* Automated code deployment

This infrastructure will work for just about any web use case
and just about any programing language. It works for REST APIs, 
simple static sites, single page apps, distributed 
containerized micro services, etc.

Here are the components. Probably the only 
unfamiliar items are `certbot-s3front` and `ssl-cert-check`.

* CloudFront CDN
* S3 Storage
* Github Source Control
* Let's Encrypt SSL
* certbot-s3front
* ssl-cert-check
* EC2 Virtual Machine
* IAM Roles
* AWS Command Line Interface
* Simple Email Service (SES)

## CloudFront CDN

CloudFront is simple to set up and dirt cheap for what
you get. Most modest sites will be a few dollars per month.

We use S3 storage to hold the CloudFront resources, and we
automatically push resources from Github using a simple shell
script. The shell script also invalidates the CDN cache if 
there are changes.

`certbot-s3front` makes it super easy to push a free SSL cert from 
Let's Encrypt up to your CloudFront CDN. A simple cron job 
renews the cert every month, and another cron script uses SES
to send email warnings if the cert is getting too close to
its expiration.

All this code, of course runs on our EC2 virtual machine, which
costs pennies per day.

## IAM Roles

IAM roles are they key to simple security. You give permissions
to your EC2 server and never have to worry about copying keys
or passwords around. All code running on our EC2 server has 
access to whatever it needs without knowing anything.

## AWS Command Line Interface

The AWS CLI can do just about anything you need to do in AWS,
and with IAM roles, your scripts and apps never have to worry 
about authentication.

We use the AWS CLI to send SES emails, invalidate the 
CloudFront cache, sync folders with S3 storage, etc.

## Automated Code Deployment

All you have to do is check your code into the master branch
in Github and your code will be automatically deployed to the 
server (for APIs, etc) or to CloudFront for static bits. For
private repos, SSH keys are pulled from S3.

## Let's Encrypt SSL

Let's Encrypt makes it super easy to generate and renew an SSL
cert to sit on your web app servers. Just a few lines of shell
script and some cron jobs and you have free, high quality
SSL certs forever.

# Free SSL Certs from Amazon

In 2016 Amazon launched its AWS Certificate Manager. This gives you free
SSL certs for use with AWS services like CloudFront and Elastic Load Balancer.

The only requirement is you need to be able to receive a verification email
for your domain.

If your domain contact information is publicly accessible on whois,
Certificate Manager will send a confirmation email to the following
contacts listed in whois.

* Domain registrant
* Technical contact
* Administrative contact

Certificate Manager will also send the confirmation email to the following
addresses in case your contact information is not available on whois
you can still confirm.

* administrator@your_domain_name
* hostmaster@your_domain_name
* postmaster@your_domain_name
* webmaster@your_domain_name
* admin@your_domain_name

So for a single certificate you may actually receive eight confirmation 
emails. But you only need to reply to one of them.

If your domain contact information is private or otherwise not listed
on whois, and you need to 
be able to receive email at one of the standard addresses for your
domain you may want to try https://forwardmx.io

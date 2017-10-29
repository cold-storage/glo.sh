# Free SSL Certs from Amazon

In 2016 Amazon launched its AWS Certificate Manager -- free
SSL certs for use with AWS services like CloudFront and Elastic Load Balancer.
Certificate Manager allows for multiple subdomains per cert and 
automatially renews certs before they expire.

The only requirement is the ability to receive the verification email
they will send to make sure you control the domain(s).

If your domain contact information is publicly accessible on whois,
Certificate Manager will send a confirmation email to the following
contacts listed in whois.

* Domain registrant
* Technical contact
* Administrative contact

Certificate Manager will also send the confirmation email to the following
addresses in case your contact information is not available on whois.

* administrator@your_domain_name
* hostmaster@your_domain_name
* postmaster@your_domain_name
* webmaster@your_domain_name
* admin@your_domain_name

For a single certificate request you may receive up to eight confirmation 
emails. But you only need to reply to one of them.

If your domain contact information is private or otherwise not listed
on whois, and you need to 
be able to receive email at one of the standard addresses for your
domain you may want to try https://forwardmx.io

If you want free certs that renew automatically for non-AWS services
https://letsencrypt.org is great too.

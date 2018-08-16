# Docker NGINX Reverse Proxy with Free Auto-Renewing SSL

The following is all it takes to run multiple different sites with 
free, auto-renewing SSL certs.

* https://github.com/jwilder/nginx-proxy
* https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion
* https://www.ssllabs.com/ssltest/analyze.html?d=sfio.candoris.com

```sh
# Nginx Proxy automatically configures nginx to reverse proxy
# to any docker container with a VIRTUAL_HOST parameter 
# (like 'rothman' and 'sfio' below).

# The four volume statements are required for proxy companion 
# to work.
docker run -d -p 80:80 -p 443:443 \
    --name proxy \
    -v /etc/certs:/etc/nginx/certs:ro \
    -v /etc/nginx/vhost.d \
    -v /usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy=true \
    jwilder/nginx-proxy

# This guy magically gives you free SSL certs for each of your
# virtual hosts.
docker run -d \
    --name companion \
    --volumes-from proxy \
    -v /etc/certs:/etc/nginx/certs:rw \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion

# Here's an example virtual host running default nginx.
docker run -d \
    --name rothman \
    -e 'LETSENCRYPT_EMAIL=jstein@candoris.com' \
    -e 'LETSENCRYPT_HOST=rothman.candoris.com' \
    -e 'VIRTUAL_HOST=rothman.candoris.com' nginx

# Here's an example virtual host running default httpd.
docker run -d \
    --name sfio \
    -e 'LETSENCRYPT_EMAIL=jstein@candoris.com' \
    -e 'LETSENCRYPT_HOST=sfio.candoris.com' \
    -e 'VIRTUAL_HOST=sfio.candoris.com' httpd
```

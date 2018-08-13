```
https://www.ssllabs.com/ssltest/analyze.html?d=sfio.candoris.com
https://github.com/jwilder/nginx-proxy
https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion
https://cloud.google.com/community/tutorials/nginx-reverse-proxy-docker

docker run -d -p 80:80 -p 443:443 \
    --name proxy \
    -v $PWD/certs:/etc/nginx/certs:ro \
    -v /etc/nginx/vhost.d \
    -v /usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy=true \
    jwilder/nginx-proxy

docker run -d \
    --name companion \
    --volumes-from proxy \
    -v $PWD/certs:/etc/nginx/certs:rw \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion

docker run -d \
    --name rothman \
    -e 'LETSENCRYPT_EMAIL=jstein@candoris.com' \
    -e 'LETSENCRYPT_HOST=rothman.candoris.com' \
    -e 'VIRTUAL_HOST=rothman.candoris.com' nginx

docker run -d \
    --name sfio \
    -e 'LETSENCRYPT_EMAIL=jstein@candoris.com' \
    -e 'LETSENCRYPT_HOST=sfio.candoris.com' \
    -e 'VIRTUAL_HOST=sfio.candoris.com' httpd
```

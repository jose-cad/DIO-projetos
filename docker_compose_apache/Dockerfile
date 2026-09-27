# Alternativa "produção": em vez de montar o volume (./website), a aplicação
# é copiada para dentro da imagem, gerando um artefato imutável e versionado.
# Use com: docker build -t meu-site-apache . && docker run -p 8080:80 meu-site-apache

FROM httpd:2.4-alpine

LABEL maintainer="seu-nome <[email protected]>" \
      description="Site estatico servido via Apache httpd"

COPY ./website/ /usr/local/apache2/htdocs/

# Apache já expõe a 80 na imagem base, mas deixamos explícito:
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

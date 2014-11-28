FROM ubuntu:14.04
MAINTAINER Franko <franko@akr.club>

ENV DEBIAN_FRONTEND noninteractive

# Get Curl...
RUN apt-get update 
RUN apt-get install -y curl
# ...To Get Node... 
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
# ...finally, install node+npm! ( to be continued )
RUN apt-get install -y imagemagick ghostscript python-pip python nodejs

RUN mkdir -p /src
COPY epub-thumbnailer /src/epub-thumbnailer
RUN apt-get install -y python-imaging libjpeg8 libjpeg62-dev libfreetype6 libfreetype6-dev
RUN cd /src/epub-thumbnailer && pip install Pillow
RUN cd /src/epub-thumbnailer && python install.py install


# Give it a home
RUN mkdir -p /srv/app

# Dump some files to play with!
COPY public /srv/app/public
COPY filebase /srv/app/filebase

# Generate epub thumbs
RUN cd /srv/app/filebase/documents && for f in *.epub; do epub-thumbnailer "$(basename "$f")" "/srv/app/public/thumb-${f%}.png" 300; done
# Generate pdf thumbs
RUN cd /srv/app/filebase/documents && for f in *.pdf; do convert -thumbnail x300 -background white -alpha remove "$(basename "$f")[0]" "/srv/app/public/thumb-${f%}.png"; done

# # Get package.json and install (this way helps docker not recompile them all the time)
# COPY package.json /srv/app/package.json
# RUN  cd /srv/app && npm install && npm shrinkwrap
COPY node_modules /srv/app/node_modules

# Get the app files onto the machine
COPY app/server.js /srv/app/server.js
COPY app/template.html /srv/app/template.html

# continued: then remove uneeded Curl.
RUN apt-get remove --purge -y curl && apt-get autoremove -y

EXPOSE 8080
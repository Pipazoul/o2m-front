FROM ubuntu:22.04

RUN apt-get update && apt install -y wget python3-pip python3-dev \ 
python3-setuptools python3-wheel python3-cffi 
# Mopidy
RUN mkdir -p /etc/apt/keyrings
RUN wget -q -O /etc/apt/keyrings/mopidy-archive-keyring.gpg \
    https://apt.mopidy.com/mopidy.gpg
RUN  wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/bullseye.list
RUN apt-get update
RUN apt-get -y install mopidy 
RUN  apt-get install -y swig libpcsclite-dev libcairo2-dev


# Install mopidy extensions
RUN pip install Mopidy-Iris
RUN pip install Mopidy-Local
RUN pip install Mopidy-Podcast
#RUN pip install Mopidy-Spotify
RUN pip install Mopidy-Podcast-iTunes
RUN pip install Mopidy-TuneIn
RUN pip install Mopidy-YouTube


COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY create_conf.sh /create_conf.sh
RUN chmod +x /create_conf.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
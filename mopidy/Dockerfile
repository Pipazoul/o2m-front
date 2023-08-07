FROM ubuntu:22.04 as builder

# interactive mode
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Install Rust gstreamer
RUN apt update
RUN apt install -y curl
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup toolchain install nightly
RUN rustup default nightly
RUN apt install -y libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev gcc pkg-config git
RUN git clone --depth 1 https://gitlab.freedesktop.org/gstreamer/gst-plugins-rs
WORKDIR /app/gst-plugins-rs
RUN cargo build --package gst-plugin-spotify -Z sparse-registry  --release 

FROM ubuntu:22.04

# interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt update 

# Install dependencies
RUN apt install -y wget 

# Install Python
RUN apt update && apt install -y python3
RUN apt install -y python3-pip git

# Mopidy
RUN mkdir -p /etc/apt/keyrings
RUN wget -q -O /etc/apt/keyrings/mopidy-archive-keyring.gpg \
    https://apt.mopidy.com/mopidy.gpg
RUN  wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/bullseye.list
RUN apt-get update
RUN apt-get -y install mopidy libspotify-dev

WORKDIR /app

COPY ./entrypoint.sh ./entrypoint.sh
COPY ./create_conf.sh ./create_conf.sh
RUN chmod +x ./entrypoint.sh
RUN chmod +x ./create_conf.sh

# Install Python dependencies with caching
#RUN --mount=type=cache,target=/root/.cache \
#RUN python3 -m pip install -r requirements.txt

# Install Rust gstreamer
COPY --from=builder /app/gst-plugins-rs/target/release/libgstspotify.so /app/libgstspotify.so
RUN cp /app/libgstspotify.so /usr/lib/x86_64-linux-gnu/gstreamer-1.0/

# install mopidy-spotify
RUN python3 -m pip install https://github.com/mopidy/mopidy-spotify/archive/master.zip

ENTRYPOINT ["sh", "./entrypoint.sh"]
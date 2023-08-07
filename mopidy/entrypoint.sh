sh create_conf.sh

# Start mopidy service
mopidy --config /etc/mopidy/mopidy.conf &

tail -f /dev/null


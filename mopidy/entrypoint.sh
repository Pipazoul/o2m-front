sh create_conf.sh

# Start mopidy service
/usr/bin/mopidy --config /etc/mopidy/mopidy.conf &

tail -f /dev/null


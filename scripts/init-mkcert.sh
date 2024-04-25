#!/bin/bash

readonly DEFAULT_HOSTS="localhost 127.0.0.1 ::1"
readonly hostname=$1

readonly mkcert_intalled=$(which mkcert)

readonly cert_dir="$PWD/.certificates"
readonly key_path="$cert_dir/localhost-key.pem"
readonly cert_path="$cert_dir/localhost.pem"

if [ -z $mkcert_intalled ];then
    echo "💬 Downloading mkcert package...\n"
    brew install mkcert
fi

mkdir $cert_dir

echo "💬 Attempting to generate self-signed certificate...\n"

if [ "$hostname" != "" ];then
    mkcert -install -key-file $key_path -cert-file $cert_path $DEFAULT_HOSTS $hostname
else
    mkcert -install -key-file $key_path -cert-file $cert_path $DEFAULT_HOSTS
fi

echo "🚀 CA Root certificate created!"
echo "🚀 Certificates created in ${cert_dir}"

var proxyDomains = [
    '.google.',
    'www.gstatic.com',
    'golang.org',
    'ajax.googleapis.com',
    's.ytimg.com',
    '.github.com',
    '.facebook.',
    '.gravatar.',
    '.slideshare.'
];


function FindProxyForURL(url, host) {
    var isLocal = isPlainHostName(host) || shExpMatch(host, "*.local")
    if (isLocal) {
        return "DIRECT";
    }

    if (/^[0-9.]+$/.test(host)) {
        if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0") ||
            isInNet(host, "127.0.0.0", "255.255.255.0")) {
            return "DIRECT";
        }
    }

    for (var d in proxyDomains) {
        if (host.indexOf(proxyDomains[d]) != -1) {
            return "SOCKS5 127.0.0.1:7070; DIRECT";
        }
    }
    return "DIRECT";
}

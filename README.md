# tydids-p2p-mqtt

<a href="https://stromdao.de/" target="_blank" title="STROMDAO - Digital Energy Infrastructure"><img src="https://rawcdn.githack.com/energychain/tydids-p2p-http/39ee1b927300efeb6aca81abfe98ca079f6a06be/static/stromdao.png" align="right" height="85px" hspace="30px" vspace="30px"></a>

**[TyDIDs](https://tydids.com) based P2P Data Identity collector and publisher for MQTT / MQIsdp / WMQTT**

[![npm](https://img.shields.io/npm/dt/tydids-p2p-mqtt.svg)](https://www.npmjs.com/package/tydids-p2p-mqtt)
[![npm](https://img.shields.io/npm/v/tydids-p2p-mqtt.svg)](https://www.npmjs.com/package/tydids-p2p-mqtt)
[![CO2Offset](https://api.corrently.io/v2.0/ghgmanage/statusimg?host=tydids-p2p-mqtt&svg=1)](https://co2offset.io/badge.html?host=tydids-p2p-mqtt)
[![Join the chat at https://gitter.im/stromdao/tydids-p2p](https://badges.gitter.im/stromdao/tydids-p2p.svg)](https://gitter.im/stromdao/tydids-p2p?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Imagine a dataset that is available somewhere in the world might be accessed everywhere. How? You just need to know its address!
- Decide who is allowed to see this dataset.
- Forget about protocols, p2p, request-responds, polling for changes.
- Set a value in your dataset with one line of code
- Subscribe to changes with another single line of code

## This is [TyDIDs](https://github.com/energychain/tydids-p2p).

```
npm install -g tydids-p2p-mqtt

tydids-p2p-mqtt -h

Usage: tydids-mqtt

Options:
  -priv --privateKey <key>
  -n --influxHost <hostname>
  -p --presentation [address]
  -P --influxPort <port>
  -d --influxDatabase <name>
  -m --influxMeasurement <name>
  -q --query <influxQuery>
  -t --represent <MilliSeconds>
  --createPrivateKey
  -h, --help                     display help for command
```

## Maintainer / Imprint

<addr>
STROMDAO GmbH  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
kontakt@stromdao.com  <br/>
  <br/>
Handelsregister: HRB 728691 (Amtsgericht Mannheim)
</addr>

Project Website: https://tydids.com/

## [CONTRIBUTING](https://github.com/energychain/tydids-p2p/blob/main/CONTRIBUTING.md)

## [CODE OF CONDUCT](https://github.com/energychain/tydids-p2p/blob/main/CODE_OF_CONDUCT.md)

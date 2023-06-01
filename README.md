### Web3 Sheets

Web3 sheet functions written in Google Apps Script for Google Sheets

| Name    | Arguments                                | Return value                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                
|---------|------------------------------------------|-----------------------------------|
| CALLINT | Request cell coordinates (example: `A2`) | Result of request from given cell |

### How to use it
1) Add JSON url to table cell (for example, in `A1`)
```shell
https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=150&convert=USD&CMC_PRO_API_KEY=<API_KEY>
```
2) Insert request (for example, in `A2`)
```shell
json(A1).status.total_count
```
3) Call request from another cell (for example, in `B2`)
```shell
=CALLINT(A2)
```

Result will be displayed in `B2`.

### Examples of requests
#### Nested object
```shell
json(A1).status.total_count
```

#### Get array element by property
```shell
json(A1).data.if(symbol=='BTC').name
```

#### Get array element by index
```shell
json(A1).data.7.name
```

#### Display array elements
```shell
json(A1).data.7.tags
```

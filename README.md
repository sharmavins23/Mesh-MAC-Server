# Mesh MAC Readout

This server takes JSON inputs containing various MAC IDs and prints them out to
a site along with message counts.

For testing the functionality of an ESP mesh network, the server is valuable for
demonstrating the number of nodes in the network as well as JSON communication
between both the nodes and a separate server. The project will keep track of a
list of device MAC IDs as well as the number of communications given to the
server from the individual mesh nodes.

## Testing with Hoppscotch

When the server is enabled on my machine, I can test via a POST request
structured as follows:

```js
const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: '{"deviceIDs":["testProtocol","testProtocol2"]}',
};

fetch("http://vinsdev.ml:8080/update", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
```

This requires the port to be forwarded.

# License TL;DR

This project is distributed under the MIT license. This is a paraphrasing of a
[short summary](https://tldrlegal.com/license/mit-license).

This license is a short, permissive software license. Basically, you can do
whatever you want with this software, as long as you include the original
copyright and license notice in any copy of this software/source.

## What you CAN do:

-   You may commercially use this project in any way, and profit off it or the
    code included in any way;
-   You may modify or make changes to this project in any way;
-   You may distribute this project, the compiled code, or its source in any
    way;
-   You may incorporate this work into something that has a more restrictive
    license in any way;
-   And you may use the work for private use.

## What you CANNOT do:

-   You may not hold me (the author) liable for anything that happens to this
    code as well as anything that this code accomplishes. The work is provided
    as-is.

## What you MUST do:

-   You must include the copyright notice in all copies or substantial uses of
    the work;
-   You must include the license notice in all copies or substantial uses of the
    work.

If you're feeling generous, give credit to me somewhere in your projects.

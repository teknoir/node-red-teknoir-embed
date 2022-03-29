module.exports = function (RED) {

    function Embed(config) {
        RED.nodes.createNode(this, config);
        let node = this;

        // Hack to make it start
        this.renderInterval = setInterval( function() {
            node.emit("input", "ping");
        }, 250);

        node.on("input", function (msg) {
            try {
                let d = {
                    id: node.id,
                };
                RED.comms.publish("embed-render", d);
            } catch (e) {
                node.error("Error sending data", e);
            }
        });

        node.on("close", function () {
            node.status({});
        });
    }

    RED.nodes.registerType("embed", Embed);
    Embed.prototype.close = function() {
        if (this.onceTimeout) {
            clearInterval(this.renderInterval);
        }
    };
};

import React from "react";

class App extends React.Component {
    state = {
        word: "test word",
    };

    componentDidMount() {
        console.log("xxx");
        const script = document.createElement("script");
        const url =
            "https://www.paypal.com/sdk/js?client-id=AbZ4SgDEKTPsZXrP6qLGxY45lzHwEoAFtaDH4A44jAvH4-NdUJmPNuFx57zIVa1ErJR9_js4GBFMOWH99&buyer-country=US";
        script.src = url;
        script.async = false;
        const baseOrderAmount = "15.00";
        document.getElementById('root').appendChild(script);
        console.clear();
        // debugger;
        script.onload = function () {
            window.paypal
                .Buttons({
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        // value: baseOrderAmount,
                                        value: 15,
                                        // currency_code: "EUR",
                                        currency_code: "USD",
                                    },
                                    shipping: {
                                        options: [
                                            {
                                                id: "SHIP_123",
                                                label: "Free Shipping",
                                                type: "SHIPPING",
                                                selected: true,
                                                amount: {
                                                    value: "3.00",
                                                    currency_code: "USD",
                                                },
                                            },
                                            // {
                                            //     id: "SHIP_456",
                                            //     label: "Pick up in Store",
                                            //     type: "PICKUP",
                                            //     selected: false,
                                            //     amount: {
                                            //         value: "0.00",
                                            //         currency_code: "USD",
                                            //     },
                                            // },
                                            {
                                                id: "SHIP_789",
                                                label: "another method",
                                                type: "SHIPPING",
                                                selected: false,
                                                amount: {
                                                    value: "4.00",
                                                    currency_code: "USD",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        });
                    },
                    onShippingChange: function (data, actions) {
                        debugger;
                        data.amount.value =
                            // parseFloat(baseOrderAmount) +
                            (
                                15 +
                                parseFloat(
                                    data.selected_shipping_option.amount.value
                                )
                            ).toFixed(2);
                        console.log("data.amount.value", data.amount.value);

                        let obj = actions.order.patch([
                            {
                                op: "replace",
                                path: "/purchase_units/@reference_id=='default'/amount",
                                value: {
                                    value: data.amount.value,
                                    // value: 88,
                                    currency_code: "USD",
                                },
                            },
                        ]);
                        debugger;
                        return obj;
                    },
                })
                .render("#paypal-button-container");
        };
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    name="test"
                    id="test"
                    value={this.state.word}
                />
                <div id="paypal-button-container"></div>

                <script
                    defer
                    src="https://unpkg.com/pp-props@1.0.0/dist/pp-props.js"
                ></script>

                <div width="200px">
                    <div id="pp-props" type="cart"></div>
                </div>
            </div>
        );
    }
}

export default App;

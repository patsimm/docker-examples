from led_switch import LED_Switch as LED
from flask import Flask
app = Flask(__name__)

led = LED(4)


@app.route("/led/on")
def switch_on():
    led.on()
    return state()


@app.route("/led/off")
def switch_off():
    led.off()
    return state()


@app.route("/led/state")
def get_state():
    return state()

def state():
    s = led.state()
    if s == LED.ON:
        return "{ \"state\": \"ON\" }"
    elif s == LED.OFF:
        return "{ \"state\": \"OFF\" }"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)

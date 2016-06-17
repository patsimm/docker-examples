try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")

class LED_Switch:

    OFF = 0
    ON = 1

    def __init__(self, pin=7):
        self.led_pin = pin
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.led_pin, GPIO.OUT)
        GPIO.output(self.led_pin, GPIO.LOW)
        self.status = LED_Switch.OFF

    def on(self):
        GPIO.output(self.led_pin, GPIO.HIGH)
        self.status = LED_Switch.ON

    def off(self):
        GPIO.output(self.led_pin, GPIO.LOW)
        self.status = LED_Switch.OFF

    def state(self):
        return self.status

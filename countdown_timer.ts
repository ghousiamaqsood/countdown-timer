import time
import datetime

def countdown(t):
    while t:
        mins, secs = divmod(t, 60)
        timer = '{:02d}:{:02d}'.format(mins, secs)
        print(timer, end="\r")
        time.sleep(1)
        t -= 1

    # Get current date and time
    now = datetime.datetime.now()
    # Format the date and time
    formatted_datetime = now.strftime("%Y-%m-%d %H:%M:%S")

    print(f"Time's up! It's {formatted_datetime}. You're awesome!")

# Get input from the user for the countdown duration
t = input("Enter the time in seconds: ")

# Start the countdown
countdown(int(t))

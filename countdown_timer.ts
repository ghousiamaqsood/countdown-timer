import questionary
from datetime import datetime, timedelta
import time
import os
import platform
import sys

def beep():
    if platform.system() == "Windows":
        import winsound
        winsound.Beep(1000, 500)
    else:
        os.system('printf "\a"')

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    user_input = questionary.text("⏱ Please enter the amount of seconds (max 60):").ask()

    if not user_input.isdigit():
        print("❌ Please enter a valid number.")
        return

    input_seconds = int(user_input)

    if input_seconds > 60:
        print("❌ Seconds must be 60 or less.")
        return

    def start_timer(seconds):
        end_time = datetime.now() + timedelta(seconds=seconds)
        total = seconds

        while True:
            time_diff = end_time - datetime.now()
            remaining = int(time_diff.total_seconds())

            if remaining <= 0:
                clear()
                print("✅ Timer has expired!")
                beep()
                sys.exit()

            minutes = remaining // 60
            secs = remaining % 60
            progress = int(((total - remaining) / total) * 30)
            bar = "█" * progress + "-" * (30 - progress)

            clear()
            print(f"\n⏳ Time Left: {minutes:02d}:{secs:02d}")
            print(f"[{bar}]")
            time.sleep(1)

    start_timer(input_seconds)

if __name__ == "__main__":
    main()

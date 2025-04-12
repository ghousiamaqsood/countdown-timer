#!/usr/bin/env python3
from PyInquirer import prompt
from datetime import datetime, timedelta
import time
import sys
import os
import platform

def beep():
    if platform.system() == "Windows":
        import winsound
        winsound.Beep(1000, 500)  # frequency, duration
    else:
        # For Mac/Linux
        os.system('printf "\a"')

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    questions = [
        {
            'type': 'input',
            'name': 'userInput',
            'message': '⏱ Please enter the amount of seconds (max 60):',
            'validate': lambda val: (
                "Please enter a valid number" if not val.isdigit()
                else "Seconds must be 60 or less" if int(val) > 60
                else True
            )
        }
    ]

    answers = prompt(questions)
    input_seconds = int(answers['userInput'])

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


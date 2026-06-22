import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import pandas as pd
except ImportError:
    install('pandas')
    import pandas as pd

try:
    import openpyxl
except ImportError:
    install('openpyxl')
    import openpyxl

excel_path = "Interview Copilot Database Schema.xlsx"
xl = pd.ExcelFile(excel_path)
with open("schema_output.md", "w") as f:
    for sheet_name in xl.sheet_names:
        f.write(f"=== SHEET: {sheet_name} ===\n")
        df = xl.parse(sheet_name)
        f.write(df.to_csv(index=False))
        f.write("\n\n")

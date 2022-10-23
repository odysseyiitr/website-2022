import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet"

const readMembersFromSheet: (sheetId: string) => Promise<GoogleSpreadsheetRow[]> = async (sheetId) => {
    const doc: GoogleSpreadsheet = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet: GoogleSpreadsheetWorksheet = doc.sheetsById[sheetId];
    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();

    return rows;
}

export { readMembersFromSheet };
/************************************************
 * Facility OS 2.0
 * exportService.js
 ************************************************/

class ExportService {

    exportJson(data, filename = "export.json") {

        const blob = new Blob(

            [

                JSON.stringify(

                    data,

                    null,

                    2

                )

            ],

            {

                type: "application/json"

            }

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = filename;

        a.click();

        URL.revokeObjectURL(url);

    }

}

export const exportService =
    new ExportService();
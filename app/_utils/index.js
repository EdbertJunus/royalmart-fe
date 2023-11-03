import { Workbook } from "exceljs";
import FileSaver from "file-saver";

export const getCookie = (cookie_name) => {
  const cookies = document.cookie.split(";");
  const cookies_length = cookies.length;

  for (let i = 0; i < cookies_length; i++) {
    const current_cookie = cookies[i].split("=");
    if (current_cookie[0].replace(" ", "") === cookie_name)
      return current_cookie[1];
  }
};

export const outputExcel = (data, columns, outputFile) => {
  const workbook = new Workbook();

  const worksheet = workbook.addWorksheet("Sheet1");

  const wsColumn = [];

  columns.forEach((element) => {
    wsColumn.push({
      header: element.toString().toUpperCase(),
      key: element.toString(),
      width: 15,
    });
  });

  console.log(wsColumn);
  worksheet.columns = wsColumn;
  // worksheet.addRow(columns);
  worksheet.addRows(data);

  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(blob, outputFile);
  });
};

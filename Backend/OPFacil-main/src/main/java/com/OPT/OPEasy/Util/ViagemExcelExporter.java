package com.OPT.OPEasy.Util;
import java.io.IOException;
import java.util.List;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
 
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.OPT.OPEasy.model.Transporte;
import com.OPT.OPEasy.model.Viagem;

public class ViagemExcelExporter {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private boolean isComplete;
    private List<Viagem> listViagens;
     
    public ViagemExcelExporter(List<Viagem> listViagens, boolean isComplete) {
        this.listViagens = listViagens;
        this.isComplete = isComplete;
        workbook = new XSSFWorkbook();
    }

    private void writeHeaderLine() {
        sheet = workbook.createSheet("Users");
         
        Row row = sheet.createRow(0);
         
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Viagem ID", style);      
        createCell(row, 1, "Motorista", style);       
        createCell(row, 2, "Mercado", style);
        createCell(row, 3, "Transporte", style);
        createCell(row, 4, "Data", style);    
        createCell(row, 5, "Valor", style);
        if(!isComplete)
            return;
        createCell(row, 6, "Transporte ID", style);
        createCell(row, 7, "Universo", style);
         
    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else if (value instanceof Long) {
            cell.setCellValue((Long) value);
        } else if (value instanceof Float) {
            cell.setCellValue((Float) value);
        } else if (value instanceof LocalDate) {
            cell.setCellValue((String) ((LocalDate) value).format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }
    
    private void writeDataLines() {
        int rowCount = 1;
 
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        boolean blankLine = false;
        boolean showValue = true;
        for (Viagem viagem : listViagens) {
            if(blankLine){
                sheet.createRow(rowCount++);
            }

            showValue = true;
            for(Transporte transp: viagem.getTransportes()){
                
                Row row = sheet.createRow(rowCount++);
                int columnCount = 0;
                createCell(row, columnCount++, viagem.getId(), style);
                createCell(row, columnCount++, viagem.getMotorista().getNick(), style);
                createCell(row, columnCount++, transp.getMercado().getNick(), style);
                createCell(row, columnCount++, transp.getTransporte(), style);
                createCell(row, columnCount++, viagem.getData(), style);
                createCell(row, columnCount++, getValue(viagem, showValue), style);
                if(isComplete){
                    createCell(row, columnCount++, transp.getId(), style);
                    createCell(row, columnCount++, transp.getUniverso(), style);
                }

                showValue = false;
                blankLine = true;
            }
        }
    }

    private String getValue(Viagem viagem, boolean showValue){
        if(!showValue)
            return "";
        return  String.valueOf(viagem.getValor());
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();
         
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
         
        outputStream.close();
         
    }
 
}

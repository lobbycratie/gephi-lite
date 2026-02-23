Sub main()

CleanupText "Nodes", 4
CleanupText "Edges", 3

TrimLabels "Nodes", 1
TrimLabels "Nodes", 2
TrimLabels "Edges", 1
TrimLabels "Edges", 2

baseUrl = ThisWorkbook.Sheets("Paramètres").Cells(2, 3).Value
ext = ThisWorkbook.Sheets("Paramètres").Cells(3, 3).Value
ImagesUrl "Nodes", baseUrl, ext

End Sub




Sub CleanupText(sheetName, col)

Dim cWorkSheet As Worksheet
Dim regexSpaces As Object

Set cWorkSheet = ThisWorkbook.Sheets(sheetName)
Set regexSpaces = New RegExp
regexSpaces.Pattern = "[ ]{2,}"

cLine = 2
colTest = 1

cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
cellValue = Trim(cWorkSheet.Cells(cLine, col).Value)
While cellTest <> ""

    cellValue = WorksheetFunction.Substitute(cellValue, Chr(11), Chr(13))
    cellValue = regexSpaces.Replace(cellValue, " ")
    cWorkSheet.Cells(cLine, col).Value = cellValue
    
    cLine = cLine + 1
    cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
    cellValue = Trim(cWorkSheet.Cells(cLine, col).Value)
    
Wend

End Sub



Sub TrimLabels(sheetName, col)

Dim cWorkSheet As Worksheet

Set cWorkSheet = ThisWorkbook.Sheets(sheetName)

cLine = 2
colTest = 1

cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
cellValue = Trim(cWorkSheet.Cells(cLine, col).Value)
While cellTest <> ""

    cWorkSheet.Cells(cLine, col).Value = cellValue
    
    cLine = cLine + 1
    cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
    cellValue = Trim(cWorkSheet.Cells(cLine, col).Value)
    
Wend

End Sub





Sub ImagesUrl(sheetName, baseUrl, ext)
Dim cWorkSheet As Worksheet

colTest = 1
cLine = 2
col = 5

Set cWorkSheet = ThisWorkbook.Sheets(sheetName)

cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
While cellTest <> ""

    cWorkSheet.Cells(cLine, col).Value = baseUrl & cellTest & ext
    
    cLine = cLine + 1
    cellTest = Trim(cWorkSheet.Cells(cLine, colTest).Value)
    
Wend

End Sub




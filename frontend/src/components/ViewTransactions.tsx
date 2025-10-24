import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../services/ViewTransactionService";
import * as XLSX from 'xlsx-js-style';
import { jsPDF } from 'jspdf';
import Popup from "./Popup";

interface ViewTransactionsProps {
    showPopup: boolean;
    handlePopupClose: () => void;
}

export const ViewTransactions: React.FC<ViewTransactionsProps> = ({ showPopup, handlePopupClose }) => {
    const [filters, setFilters] = useState({
        year: "",
        month: "",
        type: "",
        amount: "",
        taxAmount: "",
        organizationName: "",
    });

    const [allTransactions, setAllTransactions] = useState<any[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAllTransactions = async () => {
        setIsLoading(true);
        try {
            const data = await getAllTransactions();
            setAllTransactions(data);
            setFilteredTransactions(data);
            setTotalRecords(data.length);
        } catch (error) {
            console.error("Error fetching all transactions:", error);
        }
        finally {
            setIsLoading(false); // Stop loader
        }
    };
    
    useEffect(() => {
        fetchAllTransactions();
    }, []);

    const applyFilters = () => {
        let filteredData = [...allTransactions];

        if (filters.year) {
            filteredData = filteredData.filter(transaction => transaction.date.startsWith(filters.year));
        }
        if (filters.month) {
            filteredData = filteredData.filter(transaction => {
                const month = new Date(transaction.date).getMonth() + 1;
                return month === parseInt(filters.month);
            });
        }
        if (filters.type) {
            filteredData = filteredData.filter(transaction => transaction.type === filters.type);
        }
        if (filters.amount) {
            filteredData = filteredData.filter(transaction => transaction.amount === Number(filters.amount));
        }
        if (filters.taxAmount) {
            filteredData = filteredData.filter(transaction => transaction.taxAmount === Number(filters.taxAmount));
        }
        if (filters.organizationName) {
            filteredData = filteredData.filter(transaction => transaction.organizationName.toLowerCase().includes(filters.organizationName.toLowerCase()));
        }

        setCurrentPage(1);
        setFilteredTransactions(filteredData);
        setTotalRecords(filteredData.length);
    };

    const clearFilters = () => {
        setFilters({
            year: "",
            month: "",
            type: "",
            amount: "",
            taxAmount: "",
            organizationName: "",
        });
        setFilteredTransactions(allTransactions);
        setTotalRecords(allTransactions.length);
        setCurrentPage(1);
    };

    const currentPageTransactions = filteredTransactions.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const downloadExcel = () => {
        const dataToDownload = filteredTransactions.length > 0 ? filteredTransactions : allTransactions;
    
        // Define headers
        const headers = [
            { header: 'DATE', key: 'date', width: 25 },
            { header: 'AMOUNT (RS.)', key: 'amount', width: 25 },
            { header: 'TAX AMOUNT (RS.)', key: 'taxAmount', width: 25 },
            { header: 'TYPE', key: 'type', width: 20 },
            { header: 'ORGANIZATION', key: 'organizationName', width: 50 }
        ];
    
        // Filter out userId from data
        const filteredData = dataToDownload.map(({ userId,id, ...rest }) => rest);
    
        // Create worksheet with headers
        const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: headers.map(h => h.key) });
    
        // Set column widths
        worksheet['!cols'] = headers.map(h => ({ wch: h.width }));
    
        // Set header styles
        headers.forEach((header, index) => {
            const cell_address = XLSX.utils.encode_cell({ c: index, r: 0 });
            if (!worksheet[cell_address]) return;
            if (!worksheet[cell_address].s) worksheet[cell_address].s = {};
            worksheet[cell_address].v = header.header; // Set header text to all caps
            worksheet[cell_address].s = {
                font: { bold: true },
                alignment: { horizontal: "center" }
            };
        });
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    
        XLSX.writeFile(workbook, "transactions.xlsx");
    };

    const downloadPDF = () => {
        const dataToDownload = filteredTransactions.length > 0 ? filteredTransactions : allTransactions;
        const doc = new jsPDF();
    
        // Add title to the PDF
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.text("TRANSACTIONS", doc.internal.pageSize.getWidth() / 2, 16, { align: "center" });
    
        // Set table headers
        const headers = ["DATE", "AMOUNT (RS.)", "TAX AMOUNT (RS.)", "TYPE", "ORGANIZATION"];
        const columnWidth = 40;
        const startX = 14;
        let startY = 24;
    
        // Draw headers
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold"); // Set font to bold
        headers.forEach((header, index) => {
            doc.text(header, startX + index * columnWidth, startY);
        });
    
        // Draw table rows
        doc.setFont("helvetica", "normal"); // Set font back to normal
        startY += 6;
        dataToDownload.forEach(transaction => {
            doc.text(transaction.date, startX, startY);
            doc.text(transaction.amount.toString(), startX + columnWidth, startY);
            doc.text(transaction.taxAmount.toString(), startX + 2 * columnWidth, startY);
            doc.text(transaction.type, startX + 3 * columnWidth, startY);
            doc.text(transaction.organizationName, startX + 4 * columnWidth, startY);
            startY += 6;
        });
    
        // Save the generated PDF
        doc.save("transactions.pdf");
    };

    return (
        <React.Fragment>
            {showPopup && <Popup message="Oh No!!! Please login again." onClose={handlePopupClose} />}
            {isLoading && (
                <div className="loader-container">
                    <output className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </output>
                </div>
            )}
            <div className="container mt-4">
                <div className="head">
                    <h3><b>View Transactions</b></h3>
                </div>

                {/* Filters Section */}
                <div className="row mb-3 form-background" style={{ fontFamily: "cursive" }}>
                    Filters Set 1:
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Year (eg: 2024)"
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Month (1-12)"
                            value={filters.month}
                            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <select
                            className="form-select"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="">All Types</option>
                            <option value="TDS">TDS</option>
                            <option value="ICS">ICS</option>
                            <option value="GST">GST</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3 form-background" style={{ fontFamily: "cursive" }}>
                    Filters Set 2:
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Amount(Rs.)"
                            value={filters.amount}
                            onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Tax Amount(Rs.)"
                            value={filters.taxAmount}
                            onChange={(e) => setFilters({ ...filters, taxAmount: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Organization Name"
                            value={filters.organizationName}
                            onChange={(e) => setFilters({ ...filters, organizationName: e.target.value })}
                        />
                    </div>
                </div>

                {/* Filters Buttons */}
                <div className="text-center">
                    <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
                    <button className="btn btn-secondary mx-2" onClick={clearFilters}>Clear Filters</button>
                </div>

                {/* Transactions Table */}
                <div className="form form-background table-responsive mt-3" style={{ fontFamily: "cursive" }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount (Rs.)</th>
                                <th>Tax Amount (Rs.)</th>
                                <th>Type</th>
                                <th>Organization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageTransactions.length > 0 ? currentPageTransactions.map((transaction) => {
                                return (
                                    <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.taxAmount}</td>
                                        <td>{transaction.type}</td>
                                        <td>{transaction.organizationName}</td>
                                    </tr>
                                );
                            }) :
                                <tr>
                                    <td colSpan={5} className="text-center">No Transactions Found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {/* Total Records and Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="total-records text-primary fw-bold">
                        <p>Total Records: {totalRecords}</p>
                    </div>
                    <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                                    First
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                                    Last
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="text-center mt-3 mb-3" style={{ fontFamily: "cursive" }}>
                    <button type="submit" className="btn btn-success text-center" onClick={downloadExcel}>Download Transactions in Excel</button>
                    <button type="submit" className="btn btn-danger text-center mx-3" onClick={downloadPDF}>Download Transactions in PDF</button>
                    <button type="submit" className="btn btn-primary text-center mx-3" onClick={() => { navigate(`/form90C`) }}>Tax Benefit Form</button>
                </div>
            </div>
        </React.Fragment>
    );
};
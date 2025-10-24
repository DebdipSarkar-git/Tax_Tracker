import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "../services/ViewTransactionService";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { downloadFile, getFileDetails, saveAllTransactions, submitFormDetails, uploadFile, fetchFormDetails } from "../services/Form90CService";
import { FileDetails } from "../models/FileDetails";

interface Transaction {
    id: number | null;
    date: string;
    amount: number;
    taxAmount: number;
    type: string;
    organizationName: string;
    isNew?: boolean;
}

interface Form90CData {
    username: string;
    mobileNo: number;
    financialYear: string;
}

interface Form90CProps {
    showPopup: boolean;
    handlePopupClose: () => void;
}

export const Form90C: React.FC<Form90CProps> = ({ showPopup, handlePopupClose }) => {
    let uName = useSelector((state: any) => state.login.username);
    let mobileNo = useSelector((state: any) => state.login.mobileNo);

    const [state, setState] = useState<Form90CData>({
        username: uName,
        mobileNo: mobileNo,
        financialYear: `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`,
    });

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [documentNames, setDocumentNames] = useState<FileDetails[]>([]);
    const [validFiles, setValidFiles] = useState<File[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [mandatory, setMandatory] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [valid, setValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hideAllButtons, setHideAllButtons] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showActionColumn, setShowActionColumn] = useState(false); // Add state variable

    const navigate = useNavigate();

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const data = await getAllTransactions();
            const startDate = new Date('2024-04-01');
            const endDate = new Date('2025-03-31');
            const filteredTransactions = data.filter((transaction: Transaction) => {
                const transactionDate = new Date(transaction.date);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
            setTransactions(filteredTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const data = await getFileDetails();
            setDocumentNames(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFormDetails = async () => {
        setIsLoading(true);
        try {
            const data = await fetchFormDetails();
            if (data.submitted === true) {
                setHideAllButtons(true);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFormDetails();
        fetchTransactions();
        fetchFiles();
    }, []);

    const messages = {
        TRANSACTIONS_ERROR: "Please add the details of a transaction",
        DOCUMENT_ERROR: "Please upload a valid document (PDF/JPG, max 2MB)",
        Success: "Form 90C submitted successfully",
        Error: "Please run the backend",
        Mandatory: "Form data is incomplete",
        TAX_AMOUNT_ERROR: "Tax Amount should be less than Amount"
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (transactions.length === 0 || documentNames.length === 0) {
            setMandatory(true);
        } else {
            setMandatory(false);
            setIsLoading(true);
            try {
                await submitFormDetails();
                setSuccessMessage(messages.Success);
                setErrorMessage("");
                setHideAllButtons(true);
            } catch (error: any) {
                console.error("Error fetching files:", error);
                setErrorMessage(error.response.data.errorMessage);
                setSuccessMessage("");
            } finally {
                setIsLoading(false);
            }
            setState({
                username: uName,
                mobileNo: mobileNo,
                financialYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
            });
        }
    };

    const addTransaction = () => {
        setMandatory(false);
        setTransactions((prevTrans) => [
            ...prevTrans,
            { date: "", amount: 0, taxAmount: 0, type: "", organizationName: "", id: null, isNew: true }
        ]);
        setShowActionColumn(true); // Show the Action column
        validateForm(documentNames);
    };

    const removeTransaction = (index: number) => {
        setTransactions((prev) => {
            const updatedTransactions = prev.filter((_, i) => i !== index);
            validateTransactions(updatedTransactions);
            return updatedTransactions;
        });
    };

    const handleTransactionChange = (index: number, field: keyof Transaction, value: string | number) => {
        const updatedTransactions = [...transactions];
        if (field === "date") {
            const selectedDate = new Date(value as string);
            const startDate = new Date('2024-04-01');
            const endDate = new Date('2025-03-31');
            if (selectedDate < startDate || selectedDate > endDate) {
                setFormErrors(prev => ({ ...prev, dateError: "Date must be between 1st April 2024 and 31st March 2025" }));
                return;
            } else {
                setFormErrors(prev => ({ ...prev, dateError: "" }));
            }
        }
        if (field === "amount" || field === "taxAmount") {
            if (Number(value) < 0) {
                return; // Do not allow negative values
            }
        }
        if (field === "taxAmount" && Number(value) >= updatedTransactions[index].amount) {
            setFormErrors(prev => ({ ...prev, taxAmountError: messages.TAX_AMOUNT_ERROR }));
            return;
        } else {
            setFormErrors(prev => ({ ...prev, taxAmountError: "" }));
        }
        if (field === "organizationName") {
            value = (value as string).replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic and non-space characters
        }
        (updatedTransactions[index][field]) = value as never;
        setTransactions(updatedTransactions);
        validateTransactions(updatedTransactions);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMandatory(false);
        const files = Array.from(e.target.files || []);
        const newValidFiles = files.filter(file => file.size <= 2 * 1024 * 1024 && ["application/pdf", "image/jpg", "image/jpeg"].includes(file.type));
        const invalidFiles = files.filter(file => !newValidFiles.includes(file));
    
        if (invalidFiles.length > 0) {
            setFormErrors(prev => ({ ...prev, documentError: messages.DOCUMENT_ERROR }));
        } else {
            setFormErrors(prev => ({ ...prev, documentError: "" }));
        }
    
        const validFilesCopy = newValidFiles.map(file => ({ fileName: file.name, fileType: file.type, id: null }));
        setValidFiles(prev=>[...prev,...newValidFiles]); // Reset validFiles state with new files
        setDocumentNames((prev) => {
            const newDocs = [...prev,...validFilesCopy];
            validateForm(newDocs);
            return newDocs;
        });
    };

    const validateTransactions = (transactions: Transaction[]) => {
        const isValid = transactions.every(transaction =>
            transaction.date && transaction.amount > 0 && transaction.taxAmount >= 0 && transaction.type && transaction.organizationName);
        setFormErrors(prev => ({ ...prev, transactionsError: isValid ? "" : messages.TRANSACTIONS_ERROR }));
        validateForm(documentNames);
    };

    const validateForm = (newDocs: FileDetails[]) => {
        const isValid = !Object.values(formErrors).some(error => error) && transactions.length > 0 && newDocs.length > 0;
        if ((isValid && !valid) || (!isValid && valid)) {
            setValid(isValid);
        }
    };

    validateForm(documentNames);

    const buildFormData = (file: File) => {
        const formData = new FormData();
        formData.append("fileData", file);
        const fileDto = {
            fileName: file.name,
            fileType: file.type,
            size: file.size
        };
        formData.append("fileData", file);
        formData.append("fileDto", new Blob([JSON.stringify(fileDto)], { type: "application/json" }));
        return formData;
    }

    const onSaveClick = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const newTransactions = transactions
                .filter((transaction) => !transaction.id)
                .map(({ isNew, ...rest }) => rest);
            await saveAllTransactions(newTransactions);
            Promise.all(validFiles.map(file => uploadFile(buildFormData(file))))
                .then((responses) => {
                    responses.forEach((response) => {
                        let doc = documentNames.find((doc) => doc.fileName === response.fileName);
                        if (doc) {
                            doc.id = response.id;
                            doc.fileType = response.fileType;
                        }
                    });
                    fetchTransactions();
                    setValidFiles([]);
                    setSuccessMessage("Files uploaded successfully");
                    setErrorMessage("");
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.errorMessage);
                });

        } catch (error) {
            console.error("Error Saving:", error);
        } finally {
            setIsLoading(false);
        }

    }

    const downloadDocuments = async (fileId: number | null, fileName: string) => {
        setIsLoading(true);
        try {
            const fileData = await downloadFile(fileId);
            const url = window.URL.createObjectURL(new Blob([fileData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Set the file name
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.error("Error downloading:", error);
        } finally {
            setIsLoading(false);
        }
    }

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
            <div className="container">
                <div className="row">
                    <br />
                    <div className="col-md-12">
                        <br />
                        <div>
                            <div className="head">
                                <h3><b>Form 90C</b></h3>
                            </div>
                            <div>
                                <form className="form form-background" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label"><b>Username</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control" id="username" name="username" value={state.username} readOnly />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mobileNo" className="form-label"><b>Mobile Number</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type="number" className="form-control" id="mobileNo" name="mobileNo" value={state.mobileNo} readOnly />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="financialYear" className="form-label"><b>Financial Year</b><span style={{ color: 'red' }}>*</span></label>
                                        <input type="text" className="form-control" id="financialYear" name="financialYear" value={state.financialYear} readOnly />
                                    </div>

                                    <label htmlFor="transactionHistory"><b>Transaction History</b><span style={{ color: 'red' }}>*</span></label>
                                    <div className="table-responsive">
                                        <table className="table table-bordered mt-3">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Tax Amount</th>
                                                    <th>Type</th>
                                                    <th>Organization</th>
                                                    {transactions.some(transaction => transaction.isNew) && <th>Action</th>}
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transactions.length > 0 ? transactions.map((transaction, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                min="2024-04-01"
                                                                max="2025-03-31"
                                                                value={transaction.date}
                                                                readOnly={!transaction.isNew}
                                                                onChange={(e) => handleTransactionChange(index, "date", e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={transaction.amount}
                                                                readOnly={!transaction.isNew}
                                                                onChange={(e) => handleTransactionChange(index, "amount", e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={transaction.taxAmount}
                                                                readOnly={!transaction.isNew}
                                                                onChange={(e) => handleTransactionChange(index, "taxAmount", e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <select className="form-select"
                                                                value={transaction.type}
                                                                disabled={!transaction.isNew}
                                                                onChange={(e) => handleTransactionChange(index, "type", e.target.value)}>
                                                                <option value="TDS">TDS</option>
                                                                <option value="ICS">ICS</option>
                                                                <option value="GST">GST</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={transaction.organizationName}
                                                                readOnly={!transaction.isNew}
                                                                onChange={(e) => handleTransactionChange(index, "organizationName", e.target.value)}
                                                                pattern="^[A-Za-z\s]*$"
                                                            />
                                                        </td>
                                                        {transaction.isNew && (
                                                            <td>
                                                                <button type="button" className="btn btn-danger" onClick={() => removeTransaction(index)} disabled={hideAllButtons}>
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                )) :
                                                    <tr>
                                                        <td colSpan={transactions.some(transaction => transaction.isNew) ? 6 : 5}>No Transactions Found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {formErrors.transactionsError ? <span className="text-danger">{formErrors.transactionsError}</span> : ""}
                                    <div className="text-center mt-2">
                                        <button type="button" className="btn btn-primary mb-3" onClick={addTransaction} disabled={hideAllButtons}>
                                            Add Transaction
                                        </button>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="document" className="form-label"><b>Upload Documents (PDF/JPG, max 2MB each)</b><span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="document"
                                            id="document"
                                            accept=".pdf,.jpg,.jpeg"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        {documentNames.length > 0 && (
                                            <ul className="mt-2">
                                                {documentNames.map((document, index) => (
                                                    <button type="button" key={index} className="btn btn-link" onClick={() => downloadDocuments(document.id, document.fileName)}><li className="text-success">{document.fileName}</li></button>
                                                ))}
                                            </ul>
                                        )}
                                        {formErrors.documentError ? <span className="text-danger">{formErrors.documentError}</span> : ""}
                                    </div>

                                    <div className="text-center mt-2">
                                        <button type="button" className="btn btn-secondary" onClick={() => { navigate('/view-transactions') }}>Back</button>
                                        <button type="button" className="btn btn-info mx-3" onClick={(e) => { validateForm(documentNames); onSaveClick(e); }} disabled={hideAllButtons}>Save</button>
                                        <button type="submit" className="btn btn-success mx-3" disabled={!valid || hideAllButtons}>
                                            Submit
                                        </button>
                                        <br />
                                        {mandatory ? <span className='text-danger text-center'><b>{messages.Mandatory}</b></span> : ""}
                                        {errorMessage ? <span className='text-danger text-center'><b>{errorMessage}</b></span> : ""}
                                        {successMessage ? <span className='text-success text-center'><b>{successMessage}</b></span> : ""}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
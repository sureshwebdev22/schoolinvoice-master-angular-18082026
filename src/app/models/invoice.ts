export interface Invoice {

  invoiceId?: number;
  invoiceNumber?: string;

  studentId: number;

  invoiceDate: string;
  dueDate: string;

  totalAmount?: number;

  remarks?: string;

  invoiceItems: InvoiceItem[];

}

export interface InvoiceItem {

  feeType: string;

  amount: number;

  discount: number;

  total: number;

}
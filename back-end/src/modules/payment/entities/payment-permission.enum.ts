export enum PaymentPermissionEnum {
    CAN_CREATE_PAYMENT = 'CAN_CREATE_PAYMENT',
    CAN_VIEW_ALL_PAYMENTS = 'CAN_VIEW_ALL_PAYMENTS',
    CAN_FILTER_PAYMENTS = 'CAN_FILTER_PAYMENTS',
    CAN_VIEW_PAYMENT = 'CAN_VIEW_PAYMENT',
    CAN_DELETE_PAYMENT = 'CAN_DELETE_PAYMENT',
    CAN_ADD_RECEIPT_TO_PAYMENT = 'CAN_ADD_RECEIPT_TO_PAYMENT',
    CAN_CHANGE_PAYMENT_STATUS = 'CAN_CHANGE_PAYMENT_STATUS',
}

/**
 * 
INSERT INTO permissions (name, description) VALUES 
('CAN_CREATE_PAYMENT', 'Permission to create a new payment'),
('CAN_VIEW_ALL_PAYMENTS', 'Permission to view all payments'),
('CAN_FILTER_PAYMENTS', 'Permission to filter payments based on user, maintenance request, and status'),
('CAN_VIEW_PAYMENT', 'Permission to view a single payment by ID'),
('CAN_DELETE_PAYMENT', 'Permission to delete a payment by ID'),
('CAN_ADD_RECEIPT_TO_PAYMENT', 'Permission to add a receipt to a payment'),
('CAN_CHANGE_PAYMENT_STATUS', 'Permission to change the status of a payment');
 */
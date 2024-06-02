import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";
import { showToast } from "./Toast";

// Fetch the latest sales record
export const fetchLatestSales = async (setSubmittedData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${config.API_BASE_URL}/sales/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      if (data.date) {
        // Convert date from UTC to local timezone
        let utcDate = new Date(data.date);
        let localDate = new Date(
          utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
        );
        data.date = localDate.toISOString().split("T")[0];
      }
      setSubmittedData(data);
    } else {
      console.error("Failed to fetch sales record", data);
    }
  } catch (error) {
    console.error("Error fetching sales record", error);
  }
};

// Update or insert a sales record
export const updateSalesRecord = async (date, cardPayment, cashPayment, setSubmittedData, setCardPayment, setCashPayment) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Check if cardPayment and cashPayment are valid numbers
    const cardPaymentNumber = parseFloat(cardPayment);
    const cashPaymentNumber = parseFloat(cashPayment);
    if (isNaN(cardPaymentNumber) || isNaN(cashPaymentNumber)) {
      throw new Error("Card payment and cash payment must be valid numbers");
    }

    // Convert date to UTC before storing in the database
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    const response = await fetch(`${config.API_BASE_URL}/sales/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: utcDate.toISOString().split("T")[0], // Use UTC date
        card_payment_amt: cardPaymentNumber,
        cash_payment_amt: cashPaymentNumber,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      showToast("success", "Success", "Sales record submitted successfully");
      if (data.date) {
        // Convert date from UTC to local timezone
        let utcDate = new Date(data.date);
        let localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        data.date = localDate.toISOString().split("T")[0];
      }
      setSubmittedData(data);
      setCardPayment(''); // Clear the card payment input
      setCashPayment(''); // Clear the cash payment input
      return true;
    } else {
      console.error("Failed to submit sales record", data);
      showToast("error", "Error", data.message || "Failed to submit sales record");
      return false;
    }
  } catch (error) {
    console.error("Error submitting sales record:", error);
    showToast("error", "Error", "An error occurred while submitting sales record");
    return false;
  }
};

// Edit an existing sales record
export const editSalesRecord = async (date, cardPayment, cashPayment, setSubmittedData, setCardPayment, setCashPayment) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Check if cardPayment and cashPayment are valid numbers
    const cardPaymentNumber = parseFloat(cardPayment);
    const cashPaymentNumber = parseFloat(cashPayment);
    if (isNaN(cardPaymentNumber) || isNaN(cashPaymentNumber)) {
      throw new Error("Card payment and cash payment must be valid numbers");
    }

    // Convert date to UTC before storing in the database
    const utcDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );

    const response = await fetch(`${config.API_BASE_URL}/sales/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: utcDate.toISOString().split("T")[0], // Use UTC date
        card_payment_amt: cardPaymentNumber,
        cash_payment_amt: cashPaymentNumber,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      showToast("success", "Success", "Sales record updated successfully");
      if (data.date) {
        // Convert date from UTC to local timezone
        let utcDate = new Date(data.date);
        let localDate = new Date(
          utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
        );
        data.date = localDate.toISOString().split("T")[0];
      }
      setSubmittedData(data);
      setCardPayment(''); // Clear the card payment input
      setCashPayment(''); // Clear the cash payment input
      return true;
    } else {
      console.error("Failed to update sales record", data);
      showToast(
        "error",
        "Error",
        data.message || "Failed to update sales record"
      );
      return false;
    }
  } catch (error) {
    if (
      error.message === "No token found" ||
      error.message === "Network request failed"
    ) {
      showToast(
        "error",
        "Error",
        "An error occurred while updating sales record"
      );
    } else {
      showToast(
        "error",
        "Error",
        error.message || "An error occurred while updating sales record"
      );
    }
    return false;
  }
};

// Delete a sales record
export const deleteSalesRecord = async (date, setSubmittedData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    // Send request to delete sales record
    const response = await fetch(`${config.API_BASE_URL}/sales/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: utcDate.toISOString().split("T")[0], // Assuming date is the date of the sales record
      }),
    });

    // Handle response
    const data = await response.json();
    if (response.ok) {
      showToast("success", "Success", "Sales record deleted successfully");
      setSubmittedData(null); // Clear submitted data
    } else {
      console.error("Failed to delete sales record", data);
      showToast(
        "error",
        "Error",
        data.message || "Failed to delete sales record"
      );
    }
  } catch (error) {
    console.error("Error deleting sales record", error);
    showToast(
      "error",
      "Error",
      "An error occurred while deleting sales record"
    );
  }
};

// Fetch an existing sales record
export const fetchSalesRecord = async (date, setCardPayment, setCashPayment) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const response = await fetch(`${config.API_BASE_URL}/sales/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: utcDate.toISOString().split("T")[0], // Use UTC date
      }),
    });

    const data = await response.json();
    if (response.ok) {
      if (data.message === 'No sales record found for the specified date') {
        setCardPayment("");
        setCashPayment("");
        return null;
      } else {
        setCardPayment(data.card_payment_amt.toString());
        setCashPayment(data.cash_payment_amt.toString());
        return data;
      }
    } else {
      console.error("Failed to fetch sales record", data);
      showToast(
        "error",
        "Error",
        data.message || "Failed to fetch sales record"
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching sales record", error);
    showToast(
      "error",
      "Error",
      "An error occurred while fetching sales record"
    );
    return null;
  }
};
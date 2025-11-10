import { useMutation, useQuery } from "@tanstack/react-query";
import { KESY_URL } from "@/lib/utils";
import { authAxios } from "./useAuthentication";
import { KYCFormData } from "@/app/kesy/dashboard/verification/verification-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

interface KYCStatus {
  status: string;
  documents: string[];
}

interface KYCResponse {
  kycId: string;
  status: string;
  message: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  offset: number;
  sort: Sort;
  pageSize: number;
  unpaged: boolean;
}

export interface KYCItem {
  kycId: string;
  userId: string;
  userEmail: string;
  fullName: string;
  dob: string;
  documentType: string;
  documentNumber: string;
  sourceOfFunds: string;
  documentFrontPath: string;
  documentBackPath: string;
  status: string;
  submittedAt: string;
}

export interface KYCApprovalBody {
  kycId: string;
  status: string;
  rejectedReason: string;
  reviewerNotes: string;
}
export interface PaginatedKYCResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  content: KYCItem[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

async function getKYCStatus(): Promise<KYCStatus> {
  try {
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(`${KESY_URL}/kyc/status`);

    if (response.status !== 200) {
      throw new Error("Failed to get KYC status");
    }
    return response.data;
  } catch (error) {
    console.error("error getting KYC status", error);
    throw error;
  }
}

async function submitKYCDetails(data: KYCFormData): Promise<KYCResponse> {
  if (!data.documentFront || !data.documentBack) {
    throw new Error("Document front and back are required");
  }
  try {
    const formData = new FormData();

    const jsonBlob = new Blob(
      [
        JSON.stringify({
          fullName: data.fullName,
          dob: data.dob.toDateString(),
          documentNumber: data.documentNumber,
          documentType: data.documentType,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("data", jsonBlob);
    formData.append("documentFront", data.documentFront);
    formData.append("documentBack", data.documentBack);

    const authenticatedInstance = authAxios();
    const authHeader =
      authenticatedInstance.defaults.headers.common?.Authorization ||
      authenticatedInstance.defaults.headers?.Authorization;

    const formDataInstance = axios.create({
      baseURL: KESY_URL,
      headers: {
        Authorization: authHeader,
      },
    });

    const response = await formDataInstance.post(
      `${KESY_URL}/kyc/submit`,
      formData
    );
    if (response.status !== 202) {
      toast.error("Failed to submit KYC details");
      console.error(response.data);
      throw new Error("Failed to submit KYC details");
    }
    return response.data;
  } catch (error) {
    console.error("error submitting KYC details", error);
    throw error;
  }
}

async function getAllKYCStatuses(): Promise<PaginatedKYCResponse> {
  try {
    const authenticatedInstance = authAxios();
    const response = await authenticatedInstance.get(`${KESY_URL}/admin/kyc`);

    if (response.status !== 200) {
      throw new Error("Failed to get all KYC statuses");
    }
    return response.data;
  } catch (error) {
    console.error("error getting all KYC statuses", error);
    throw error;
  }
}

async function approveKYC(body: KYCApprovalBody) {
  try {
    const authenticatedInstance = authAxios();
    const data = {
      status: body.status,
      rejectedReason: body.rejectedReason,
      reviewerNotes: body.reviewerNotes,
    };
    const response = await authenticatedInstance.patch(
      `${KESY_URL}/admin/kyc/${body.kycId}/status`,
      {
        data,
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to approve KYC");
    }
    return response.data;
  } catch (error) {
    console.error("error approving KYC", error);
    throw error;
  }
}

export const useApproveKYC = () => {
  return useMutation({
    mutationFn: approveKYC,
    onSuccess: () => {
      toast.success("KYC approved successfully");
    },
    onError: (error) => {
      toast.error("Failed to approve KYC");
      console.error(error);
    },
  });
};

export const useKYCStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKYCStatus,
  });
  return { data, isLoading, error };
};

export const useSubmitKYCDetails = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: submitKYCDetails,
    onSuccess: () => {
      toast.success(
        "KYC details submitted successfully. Please wait for approval."
      );
    },
    onError: (error) => {
      toast.error("Failed to submit KYC details");
      console.error(error);
    },
  });
};

export const useGetAllKYCStatuses = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-kyc-statuses"],
    queryFn: getAllKYCStatuses,
  });
  return { data, isLoading, error };
};

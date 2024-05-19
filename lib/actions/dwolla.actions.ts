"use server";

import { Client } from "dwolla-v2";

const getEnviroment = (): "production" | "sandbox" => {
  const enviroment = process.env.DWOLLA_ENV as string;

  switch (enviroment) {
    case "production":
      return "production";
    case "sandbox":
      return "sandbox";
    default:
      throw new Error(
        "Dwolla enviroment is not set. Please set it to production or sandbox."
      );
  }
};


const dwollaClient = new Client({
    environment: getEnviroment(),
    key: process.env.DWOLLA_KEY as string,
    secret: process.env.DWOLLA_SECRET as string,
})


export const createFundingSource = async ( options: CreateFundingSourceOptions ) => {
    try {
        return await dwollaClient
        .post(`customers/${options.customerId}/funding-sources`, {
         name: options.fundingSourceName,
         plaidToken: options.plaidToken,
        })
        .then((res: any) => res.headers.get("location"));
    } catch (error) {
        console.error("Creating a new funding source failed", error);
    }
}

export const createOnDemandAuthorization = async () => {
    try {
       const onDemandAuthorization = await dwollaClient.post(
        "on-demand-authorizations",
       )
       const authLink = onDemandAuthorization.body._links;
       return authLink;
    } catch (error) {
        console.error("Creating an On Demand Authorization failed", error);
    }
}


export const createDwollaCustomer = async (
    newCustomer: NewDwollaCustomerParams
) => {
    try {
        return await dwollaClient
        .post("customers", newCustomer)
        .then((res: any) => res.headers.get("location"));
    } catch (error) {
        console.error("Creating a new customer failed", error);
    }
}

export const createTransfer = async ({
    sourceFundingSourceUrl,
    destinationFundingSourceUrl,
    amount,
}: TransferParams) => {
  try {
    const requestBody = {
        _links: {
            source: {
                href: sourceFundingSourceUrl,
            }
        },
        destination: {
            href: destinationFundingSourceUrl,
        },
        amount: {
            currency: "USD",
            value: amount,
        },
    };
    return await dwollaClient
    .post("transfers", requestBody)
    .then((res: any) => res.headers.get("location"));
  } catch (error) {
    console.error("Transfer failed", error);
  }
}

export const addFundingSource = async ({
    dwollaCustomerId,
    processorToken,
    bankName,
}: AddFundingSourceParams) => {
   try {
    const dwollaAuthLinks = await createOnDemandAuthorization();

    const fundingSourceOptions = {
        customerId: dwollaCustomerId,
        fundingSourceName: bankName,
        plaidToken: processorToken,
        _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
   } catch (error) {
     console.error("Transfer fund failed", error);
   }
}
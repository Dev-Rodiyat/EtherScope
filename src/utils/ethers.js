import { ethers } from "ethers";
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

const getENSRecords = async (ensName) => {
  try {
    const resolver = await provider.getResolver(ensName);
    if (!resolver) throw new Error("No resolver found for ENS");

    const keys = [
      "avatar",
      "description",
      "com.twitter",
      "url",
      "email",
      "com.discord",
      "org.telegram",
      "com.github",
      "com.reddit",
      "com.linkedin",
      "location",
    ];

    const recordPromises = keys.map((key) =>
      resolver.getText(key).catch(() => null)
    );
    const results = await Promise.all(recordPromises);

    const [
      avatar,
      bio,
      twitter,
      website,
      email,
      discord,
      telegram,
      github,
      reddit,
      linkedin,
      location,
    ] = results;

    return {
      avatar,
      bio,
      twitter,
      website,
      email,
      discord,
      telegram,
      github,
      reddit,
      linkedin,
      location,
    };
  } catch (error) {
    console.error("[getENSRecords] Error:", error.message);
    return {};
  }
};

export const resolveENS = async (input) => {
  try {
    if (input.endsWith(".eth")) {
      const address = await provider.resolveName(input);
      if (!address) throw new Error("No address found for ENS");

      const records = await getENSRecords(input);

      return {
        type: "ens",
        name: input,
        address,
        ...records,
      };
    } else if (ethers.isAddress(input)) {
      const name = await provider.lookupAddress(input);
      const records = name ? await getENSRecords(name) : {};

      return {
        type: "address",
        name: name || null,
        address: input,
        ...records,
      };
    } else {
      throw new Error("Input must be a valid ENS name or Ethereum address");
    }
  } catch (error) {
    console.error("[resolveENS] Error:", error.message);
    throw error;
  }
};

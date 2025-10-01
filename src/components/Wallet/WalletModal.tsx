import React from "react";
import { useWallet } from "./WalletContext";

type WalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { account, connectWallet } = useWallet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
        
        {account ? (
          <div>
            <p className="text-green-600">Connected: {account}</p>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Connect with MetaMask
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border rounded hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

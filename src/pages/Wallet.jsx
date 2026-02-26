import React, { useEffect, useState } from 'react';
import { addMoneyInWallet, fetchWalletAmount, fetchWalletTransaction } from '../utils/Apis';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, History } from 'lucide-react';
import toast from 'react-hot-toast';

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');


  useEffect(() => {
    const getWalletData = async () => {
      try {
        setLoading(true);
        const amountData = await fetchWalletAmount();
        setBalance(amountData || 0);
        // console.log("amountData", amountData) 

        const transData = await fetchWalletTransaction(1, 10);
        console.log("transData", transData);
        setTransactions(transData || []); 
      } catch (error) {
        console.error('Wallet error:', error);
      } finally {
        setLoading(false);
      }
    };

    getWalletData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }


  /**
   * ADD MONEY HANDLER
   */
  const addMoneyHandler = () => {
    setShowModal(true);
  }

  const handleAddMoney = () => {
    console.log('amountttttt', amount)
    if(!amount){
      toast.error("Please enter amount");
      return;
    }
    addMoneyInWallet(amount);
    setShowModal(false);
    setAmount('');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
        <button 
          onClick={addMoneyHandler}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg shadow-green-100"
        >
          <Plus size={20} />
          Add Money
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-green-100 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-green-100 text-sm font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold mb-6">₹{balance.toLocaleString()}</h2>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex-1 border border-white/20">
              <p className="text-green-100 text-xs mb-1">Total Spent</p>
              <p className="font-bold">₹0</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex-1 border border-white/20">
              <p className="text-green-100 text-xs mb-1">Total Added</p>
              <p className="font-bold">₹0</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      {/* Transactions Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <History className="text-gray-400" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <History className="text-gray-300" size={24} />
            </div>
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-gray-400 text-sm mt-1">Your wallet activity will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={transaction._id || index} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-green-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    transaction.type === 'credit' ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{transaction.description || (transaction.type === 'credit' ? 'Money Added' : 'Payment for Order')}</p>
                    <p className="text-xs text-gray-400 font-medium">{transaction.createdAt}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${transaction.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">{transaction.status || 'Success'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD MONEY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Add Money</h2>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg p-2" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-300">
                Cancel
              </button>
              <button onClick={handleAddMoney} className="px-4 py-2 rounded-lg bg-green-600 text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Wallet;
import { useContext, useState } from "react";
import ContractContext from '../../context/ContractProvider';
import CurrentAccountContent from "../../context/CurrentAccountProvider";
import { ManagedAccount } from '../../utils/types';
import TableRow from './TableRow';
import { ethers } from "ethers";

interface Props {
    data: ManagedAccount[];
    setData: React.Dispatch<React.SetStateAction<ManagedAccount[]>>;
    setIsLoading: (arg0: boolean) => void;
}

/**
 * GraphQLで取得した結果を表形式で出力するためのコンポーネント
 * @param data データ
 */
const WalletTable = (props:Props) => {

    const { 
        data,
        setData,
        setIsLoading 
    } = props;
    
    const [currentAccount] = useContext(CurrentAccountContent);
    const [createNewFactory, addStake] = useContext(ContractContext);
    const [newAddress, setNewAddress] = useState("");
    const [isAddress, setIsAddress] = useState(true);

    /**
     * create newFactory method
     */
    const createFactory = async() => {
        try {
            setIsLoading(true);
            await createNewFactory(currentAccount!);
            alert('send sucess!!!');
            setIsLoading(false);
        } catch(err) {
            console.log("err:", err);
            alert('send fai....');
            setIsLoading(false);
        }
    };

    const addAddreass = () => {
        if(!ethers.utils.isAddress(newAddress)){
            setIsAddress(false);
            setNewAddress("");
            return;
        }

        setData(prevData => [
            ...prevData,
            {
                id: "-",
                contractWalletAddress: newAddress,
                name: "--",
            }
        ])
        setIsAddress(true);
        setNewAddress("");
    }

    /**
     * tableRows
     */
    const TableRows = () => {
        console.log("the graph data");
        console.log(data);
        console.log(Object.keys(data[1]));
        return (data.map((managedAccount: ManagedAccount) => (
            <TableRow 
                managedAccount={managedAccount} 
                setIsLoading={setIsLoading} 
                currentAddress={currentAccount!}
                addStake={addStake}
            />
        )))
    }
        
    return (
        <>
            <div className="mb-8">
                Contract Wallets
            </div>
            <table>
                <thead>
                    <tr >
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>ID</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>Name</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>Contract Wallet Address</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>Balance</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>Deposit</th>
                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-teal-600 text-center text-xs font-semibold text-white uppercase tracking-wider'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {TableRows()}
                </tbody>
            </table>
            <div className="m-4">
                {/* <button 
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                    onClick={createFactory}
                >
                    Create New Factory
                </button> */}
                <div className="flex">
                    <input className="w-auto px-2 text-base" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                    <button className="bg-indigo-700 text-white px-8 py-2 text-sm" onClick={addAddreass}>Add Address</button>
                </div>
                {!isAddress && (
                    <p className="mt-1 text-red-500 text-sm">Non-existent address...</p>
                )}
            </div>
        </>
    );
}

export default WalletTable;
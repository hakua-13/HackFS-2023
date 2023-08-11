import { useState } from 'react';
import WalletTable from '../Components/WalletTable';
import Spinner from '../Components/common/Spinner';
import { ManagedAccount } from '../utils';

const sampleData: ManagedAccount[] = [
  {
    id: "0",
    contractWalletAddress: "0xc9d7144d4Bb4fF5936D1540faaeeFd0201b5fdf8",
    name: "--"
  },
  {
    id: "1",
    contractWalletAddress: "0xB05c8a4a1589F6809d1be61E81C0296a36652A26",
    name: "--"
  },
]

/**
 * App Component
 * @returns 
 */
function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ManagedAccount[]>(sampleData);

  const fetching = false;

  return (
    <div className="App">
      <header className="App-header">
        {fetching ?
          <Spinner/>
        : 
          <>
            {isLoading ? 
              <Spinner/>
            :
              <>{data !== undefined && <WalletTable data={data} setData={setData} setIsLoading={setIsLoading} />}</>
            }
          </>
        }
      </header>
    </div>
  );
}

export default Home;

import { NextPage } from 'next';
import Layout from '../layout';
import GreenCheckMarkCard from '@/components/GreenCheckMarkCard';

const Rewards: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <GreenCheckMarkCard />
      </div>
    </Layout>
  );
};

export default Rewards;

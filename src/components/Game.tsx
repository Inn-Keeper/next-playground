import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  rollDice
} from '@/store/slices/gameSlice';
import { useEffect } from 'react';
import { setAuthenticated, setName } from '@/store/slices/userSlice';

export default function GameStatus() {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);

  const handleRollDice = () => {
    dispatch(rollDice());
  };

  useEffect(() => {
    console.log('game.score', game.score);
    // if(game.score === 6) {
    //   dispatch(setAuthenticated(true));
    //   dispatch(setName('Dalton Castro'));
    // } else {
    //   dispatch(setAuthenticated(false));
    //   dispatch(setName(''));
    // }
  }, [game.score]);

  return (  
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Game Status
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Score:</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {game.score}
            </p>
            <button onClick={handleRollDice} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">Roll The Dice</button>
          </div>
        </div>
      </div>
      
    </div>
  );
} 
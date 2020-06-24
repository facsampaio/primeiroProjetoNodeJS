import Transaction from '../models/Transaction';

interface TransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;
    let income = 0;
    let outcome = 0;
    for(let i = 0; i < transactions.length; i++){
      if(transactions[i].type === 'outcome'){
        outcome += transactions[i].value;
      } else{
        income += transactions[i].value;
      }
    }
    let total = income - outcome;

    const balance = {income, outcome, total};

    return balance;
  }

  public create({title, value, type}: TransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

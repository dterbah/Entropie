public class Main{

    public static final double log2 = Math.log(2);
    public static double klDivergence(double[] p1, double[] p2) {
        double klDiv = 0.0;
        for(int i = 0; i < p1.length; ++i){
            if(p1[i] == 0){continue;}
            if(p2[i] == 0.0){continue;} 
      
            klDiv += p1[i] * Math.log(p1[i] / p2[i]);
        }
      
        return klDiv; 
    }

    public static void normalizeVector(double[] vector){
        double sum = 0.0;
        for(int i = 0; i < vector.length; i++){
            sum += vector[i];
        }
        for(int i = 0; i < vector.length; i++){
            vector[i] /= sum;
        }
    }

    public static void displayVector(String name, double[] vector){
        System.out.print(name + ": ");
        for(int i = 0; i < vector.length; i++){
            System.out.print(vector[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args){
        final int N = 15;

        double[][] data = 
        new double[][]
        {
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
        };

        double[] global = new double[N];
        for(int i = 0; i < N; i++){
            for(int p = 0; p < N; p++){
                global[p] += data[i][p];
            }
        }
        normalizeVector(global);

        for(int i = 0; i < N; i++){
            System.out.print(i + ": ");
            for(int p = 0; p < N; p++){
                System.out.print(data[i][p] + " ");
            }   
            System.out.println();
        }

        displayVector("Global", global);

        for(int k = 0; k < N; k++){
            double[] dataChoosen = new double[N];
            for(int i = 0; i < N; i++){
                dataChoosen[i] = data[k][i];
            }
            normalizeVector(dataChoosen);
            displayVector("(" + k + ")", dataChoosen);
            System.out.println("(" + k + ") KLD: " + klDivergence(dataChoosen, global));
        }
    }
}
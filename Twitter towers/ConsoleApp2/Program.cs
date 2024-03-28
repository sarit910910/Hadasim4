using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;


namespace ConsoleApp2
{
    public class Program
    {
        public static void Test(int choice, int height, int length)
        {
            
            if (choice == 1)
            {
                if (height == length || Math.Abs(height - length) > 5)
                    Console.WriteLine("The area of the rectangle is: " + height * length);
                else
                {
                    Console.WriteLine("The perimeter of the rectangle is: " +(2 * height + 2 * length));
                }
            }
            else if(choice == 2) 
            {
                //Calculation of the permit
                double x = Math.Sqrt((double)(height * height + length * length));
                Console.WriteLine("The perimeter of the triangle is: " + (2 * x + length));
                if (length % 2 == 0 || length > height * 2)
                    Console.WriteLine("The triangle cannot be printed");
                else 
                {
                    if (length == 1)
                    {
                        for (int k = 0; k < height; k++)
                        {
                            Console.WriteLine("*");
                        }
                    }
                    else if(length==3)
                    {
                        for (int k = 0; k < height; k++)
                        {
                            Console.WriteLine("***");
                        }
                    }
                    else
                    {
                        //Checking how many odd numbers there are in width without 1
                        int temp = length - 2, count = 0,c=3;
                        while (temp > 1)
                        {
                            count++;
                            temp -= 2;
                        }
                        //Checking how many rows of each number of asterisks there are
                        int numberOfRows = (height - 2) / count;
                        //An auxiliary variable for checking the number of rows.
                        int helpnumberOfRows = numberOfRows;
                        //Checking how many lines of length 3 there are
                        int three = height -2- numberOfRows * (count-1);
                        int i = 1;
                        //An auxiliary variable for checking how many lines of length 3 there are
                        int help = three;
                        while (i <= height)
                        {
                            if (i == 1)
                            {
                                string s= string.Concat(Enumerable.Repeat(" ", ((length - 1) / 2)));
                                Console.Write(s); 
                                Console.WriteLine("*");
                            }
                        
                            else if (help != 0)
                            {
                                string s4 = string.Concat(Enumerable.Repeat(" ", ((length - 3) / 2)));
                                string s2 = s4+"***";
                                s2 = string.Concat(Enumerable.Repeat(s2 + Environment.NewLine, help));
                                Console.Write(s2);
                                i += help;
                                help = 0;
                            }
                            else
                            {
                                if(helpnumberOfRows== numberOfRows)
                                c += 2;
                                string s = string.Concat(Enumerable.Repeat(" ", ((length - c) / 2)));
                                Console.Write(s);
                                string s2 = string.Concat(Enumerable.Repeat("*", c));
                                Console.Write(s2);
                                Console.WriteLine();
                                helpnumberOfRows--;
                                if (helpnumberOfRows == 0)
                                    helpnumberOfRows = numberOfRows;
                            }

                            i++;
                        }
                        string s3 = string.Concat(Enumerable.Repeat("*", length));
                        Console.WriteLine(s3);
                        Console.WriteLine();

                    }
                }
            }
        }
        


    }
    public class Program2
    {
        public static void Main(string[] args)
        {
            int choice = 0;
            int height = 0, length = 0;
            Console.WriteLine("Please choose one of the three options: Rectangle Tower, Triangle Tower, Exit, press 1,2,3 respectively");
            choice = int.Parse(Console.ReadLine());
            while (choice != 3)
            {
                Console.WriteLine("Enter the length");
                height = int.Parse(Console.ReadLine());
                Console.WriteLine("Enter the length of the width");
                length = int.Parse(Console.ReadLine());
                Program.Test(choice, height, length);
                Console.WriteLine("Please choose one of the three options: Rectangle Tower, Triangle Tower, Exit, press 1,2,3 respectively");
                choice = int.Parse(Console.ReadLine());
            }
            Console.WriteLine("finish");
            int t= int.Parse(Console.ReadLine());
        }
    }
}


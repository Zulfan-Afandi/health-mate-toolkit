import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Calculator, RotateCcw } from "lucide-react";

interface BMIResult {
  value: number;
  category: string;
  description: string;
  color: string;
}

const HealthCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert cm to m
    const weightInKg = parseFloat(weight);

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      let category = "";
      let description = "";
      let color = "";

      if (bmi < 18.5) {
        category = "Underweight";
        description = "BMI Anda menunjukkan berat badan kurang. Konsultasikan dengan dokter untuk program penambahan berat badan yang sehat.";
        color = "info";
      } else if (bmi < 25) {
        category = "Normal";
        description = "BMI Anda ideal! Pertahankan pola hidup sehat dengan olahraga rutin dan makan seimbang.";
        color = "success";
      } else if (bmi < 30) {
        category = "Overweight";
        description = "BMI Anda menunjukkan kelebihan berat badan. Pertimbangkan untuk menurunkan berat badan dengan diet sehat dan olahraga.";
        color = "warning";
      } else {
        category = "Obese";
        description = "BMI Anda menunjukkan obesitas. Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi.";
        color = "destructive";
      }

      setResult({
        value: parseFloat(bmi.toFixed(1)),
        category,
        description,
        color,
      });
    }
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-health">
      <div className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Health Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hitung BMI (Body Mass Index) Anda dengan mudah. 
            Dapatkan informasi tentang kategori berat badan dan rekomendasi kesehatan.
          </p>
        </div>

        {/* BMI Calculator */}
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-card border-health-bmi/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-health-bmi rounded-full flex items-center justify-center mb-2">
                <Calculator className="h-6 w-6 text-health-bmi-foreground" />
              </div>
              <CardTitle className="text-health-bmi">BMI Calculator</CardTitle>
              <CardDescription>Hitung Indeks Massa Tubuh Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Contoh: 170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Contoh: 65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={calculateBMI} 
                  className="flex-1 bg-health-bmi hover:bg-health-bmi/90"
                  disabled={!height || !weight}
                >
                  Hitung
                </Button>
                <Button variant="outline" size="icon" onClick={reset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              
              {result && (
                <div className={`p-4 rounded-lg ${
                  result.color === 'success' ? 'bg-success/10 border border-success/20' :
                  result.color === 'warning' ? 'bg-warning/10 border border-warning/20' :
                  result.color === 'info' ? 'bg-info/10 border border-info/20' :
                  'bg-destructive/10 border border-destructive/20'
                }`}>
                  <div className="text-center mb-2">
                    <p className="text-2xl font-bold">{result.value}</p>
                    <p className={`font-semibold ${
                      result.color === 'success' ? 'text-success' :
                      result.color === 'warning' ? 'text-warning' :
                      result.color === 'info' ? 'text-info' :
                      'text-destructive'
                    }`}>
                      {result.category}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Disclaimer:</strong> Hasil kalkulasi ini hanya sebagai referensi umum. 
            Untuk kondisi kesehatan spesifik, selalu konsultasikan dengan dokter atau ahli gizi profesional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;
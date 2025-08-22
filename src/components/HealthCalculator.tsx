import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Droplets, Zap, Calculator, RotateCcw } from "lucide-react";
import SmartRecommendation from "./SmartRecommendation";

interface BMIResult {
  value: number;
  category: string;
  description: string;
  color: string;
}

interface CalorieResult {
  value: number;
  description: string;
}

interface WaterResult {
  value: number;
  description: string;
}

const HealthCalculator = () => {
  // BMI Calculator State
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  // Calorie Calculator State
  const [calorieAge, setCalorieAge] = useState("");
  const [calorieGender, setCalorieGender] = useState("");
  const [calorieHeight, setCalorieHeight] = useState("");
  const [calorieWeight, setCalorieWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(null);

  // Water Calculator State
  const [waterWeight, setWaterWeight] = useState("");
  const [waterResult, setWaterResult] = useState<WaterResult | null>(null);

  const calculateBMI = () => {
    const height = parseFloat(bmiHeight) / 100; // Convert cm to m
    const weight = parseFloat(bmiWeight);

    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height);
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

      setBmiResult({
        value: parseFloat(bmi.toFixed(1)),
        category,
        description,
        color,
      });
    }
  };

  const calculateCalories = () => {
    const age = parseInt(calorieAge);
    const height = parseFloat(calorieHeight);
    const weight = parseFloat(calorieWeight);

    if (age > 0 && height > 0 && weight > 0 && calorieGender && activityLevel) {
      let bmr = 0;

      // Calculate BMR using Mifflin-St Jeor Equation
      if (calorieGender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Apply activity factor
      let activityFactor = 1.2;
      let activityDesc = "";

      switch (activityLevel) {
        case "low":
          activityFactor = 1.2;
          activityDesc = "aktivitas rendah";
          break;
        case "moderate":
          activityFactor = 1.55;
          activityDesc = "aktivitas sedang";
          break;
        case "high":
          activityFactor = 1.725;
          activityDesc = "aktivitas tinggi";
          break;
      }

      const calories = Math.round(bmr * activityFactor);
      const description = `Dengan ${activityDesc}, Anda membutuhkan ${calories} kalori per hari. Usahakan makan seimbang dengan karbohidrat, protein, dan lemak yang cukup untuk mempertahankan energi optimal.`;

      setCalorieResult({
        value: calories,
        description,
      });
    }
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);

    if (weight > 0) {
      const waterNeed = (weight * 0.033).toFixed(1);
      const description = `Berdasarkan berat badan Anda, disarankan minum air ${waterNeed} liter per hari. Air membantu menjaga metabolisme, mengatur suhu tubuh, dan membuang racun dari tubuh.`;

      setWaterResult({
        value: parseFloat(waterNeed),
        description,
      });
    }
  };

  const resetBMI = () => {
    setBmiHeight("");
    setBmiWeight("");
    setBmiResult(null);
  };

  const resetCalorie = () => {
    setCalorieAge("");
    setCalorieGender("");
    setCalorieHeight("");
    setCalorieWeight("");
    setActivityLevel("");
    setCalorieResult(null);
  };

  const resetWater = () => {
    setWaterWeight("");
    setWaterResult(null);
  };

  return (
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
          Hitung BMI, kebutuhan kalori harian, dan asupan air Anda dengan mudah. 
          Dapatkan rekomendasi kesehatan yang tepat untuk gaya hidup yang lebih sehat.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {/* Smart Recommendation - Full width */}
        <div className="lg:col-span-3">
          <SmartRecommendation />
        </div>
        {/* BMI Calculator */}
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
              <Label htmlFor="bmi-height">Tinggi Badan (cm)</Label>
              <Input
                id="bmi-height"
                type="number"
                placeholder="Contoh: 170"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmi-weight">Berat Badan (kg)</Label>
              <Input
                id="bmi-weight"
                type="number"
                placeholder="Contoh: 65"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={calculateBMI} 
                className="flex-1 bg-health-bmi hover:bg-health-bmi/90"
                disabled={!bmiHeight || !bmiWeight}
              >
                Hitung BMI
              </Button>
              <Button variant="outline" size="icon" onClick={resetBMI}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {bmiResult && (
              <div className={`p-4 rounded-lg ${
                bmiResult.color === 'success' ? 'bg-success/10 border border-success/20' :
                bmiResult.color === 'warning' ? 'bg-warning/10 border border-warning/20' :
                bmiResult.color === 'info' ? 'bg-info/10 border border-info/20' :
                'bg-destructive/10 border border-destructive/20'
              }`}>
                <div className="text-center mb-2">
                  <p className="text-2xl font-bold">{bmiResult.value}</p>
                  <p className={`font-semibold ${
                    bmiResult.color === 'success' ? 'text-success' :
                    bmiResult.color === 'warning' ? 'text-warning' :
                    bmiResult.color === 'info' ? 'text-info' :
                    'text-destructive'
                  }`}>
                    {bmiResult.category}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{bmiResult.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calorie Calculator */}
        <Card className="bg-gradient-card border-health-calorie/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-health-calorie rounded-full flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-health-calorie-foreground" />
            </div>
            <CardTitle className="text-health-calorie">Calorie Calculator</CardTitle>
            <CardDescription>Hitung kebutuhan kalori harian Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="calorie-age">Usia</Label>
                <Input
                  id="calorie-age"
                  type="number"
                  placeholder="25"
                  value={calorieAge}
                  onChange={(e) => setCalorieAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calorie-gender">Jenis Kelamin</Label>
                <Select value={calorieGender} onValueChange={setCalorieGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Pria</SelectItem>
                    <SelectItem value="female">Wanita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="calorie-height">Tinggi (cm)</Label>
                <Input
                  id="calorie-height"
                  type="number"
                  placeholder="170"
                  value={calorieHeight}
                  onChange={(e) => setCalorieHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calorie-weight">Berat (kg)</Label>
                <Input
                  id="calorie-weight"
                  type="number"
                  placeholder="65"
                  value={calorieWeight}
                  onChange={(e) => setCalorieWeight(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tingkat Aktivitas</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tingkat aktivitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Rendah (jarang olahraga)</SelectItem>
                  <SelectItem value="moderate">Sedang (olahraga 3-4x/minggu)</SelectItem>
                  <SelectItem value="high">Tinggi (olahraga 5-7x/minggu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={calculateCalories} 
                className="flex-1 bg-health-calorie hover:bg-health-calorie/90"
                disabled={!calorieAge || !calorieGender || !calorieHeight || !calorieWeight || !activityLevel}
              >
                Hitung Kalori
              </Button>
              <Button variant="outline" size="icon" onClick={resetCalorie}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {calorieResult && (
              <div className="p-4 rounded-lg bg-health-calorie/10 border border-health-calorie/20">
                <div className="text-center mb-2">
                  <p className="text-2xl font-bold text-health-calorie">{calorieResult.value} kcal</p>
                  <p className="font-semibold text-health-calorie">Per Hari</p>
                </div>
                <p className="text-sm text-muted-foreground">{calorieResult.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Water Calculator */}
        <Card className="bg-gradient-card border-health-water/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-health-water rounded-full flex items-center justify-center mb-2">
              <Droplets className="h-6 w-6 text-health-water-foreground" />
            </div>
            <CardTitle className="text-health-water">Water Calculator</CardTitle>
            <CardDescription>Hitung kebutuhan air harian Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="water-weight">Berat Badan (kg)</Label>
              <Input
                id="water-weight"
                type="number"
                placeholder="Masukkan berat badan Anda"
                value={waterWeight}
                onChange={(e) => setWaterWeight(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={calculateWater} 
                className="flex-1 bg-health-water hover:bg-health-water/90"
                disabled={!waterWeight}
              >
                Hitung Kebutuhan Air
              </Button>
              <Button variant="outline" size="icon" onClick={resetWater}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {waterResult && (
              <div className="p-4 rounded-lg bg-health-water/10 border border-health-water/20">
                <div className="text-center mb-2">
                  <p className="text-2xl font-bold text-health-water">{waterResult.value} L</p>
                  <p className="font-semibold text-health-water">Per Hari</p>
                </div>
                <p className="text-sm text-muted-foreground">{waterResult.description}</p>
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
  );
};

export default HealthCalculator;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Apple, Activity, Target, Calendar, RotateCcw } from "lucide-react";

interface RecommendationResult {
  targetCalories: number;
  calorieAdjustment: number;
  mealPlan: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  exercise: {
    type: string;
    duration: string;
    description: string;
  };
  weeklyPlan: string;
  motivation: string;
}

const SmartRecommendation = () => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [baseCalories, setBaseCalories] = useState("");
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const generateRecommendation = () => {
    const current = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);
    const base = parseFloat(baseCalories);
    const weeks = parseInt(timeframe);

    if (!current || !target || !base || !weeks || !activityLevel) return;

    const weightDiff = target - current;
    const isLosing = weightDiff < 0;
    const totalCaloriesDiff = Math.abs(weightDiff) * 7700; // 1kg = 7700 calories
    const dailyCalorieAdjustment = Math.round(totalCaloriesDiff / (weeks * 7));
    const targetCalories = isLosing ? base - dailyCalorieAdjustment : base + dailyCalorieAdjustment;

    const mealPlans = {
      losing: {
        breakfast: ["Oatmeal + buah pisang", "Telur rebus + roti gandum", "Yogurt + granola"],
        lunch: ["Nasi merah + ayam panggang + sayur bayam", "Gado-gado tanpa kerupuk", "Sup ayam + kentang rebus"],
        dinner: ["Ikan bakar + tumis kangkung", "Tahu tempe goreng + lalapan", "Sayur asem + nasi sedikit"],
        snacks: ["Buah apel/jeruk", "Kacang almond (segenggam)", "Teh hijau tanpa gula"]
      },
      gaining: {
        breakfast: ["Nasi uduk + ayam goreng", "Roti bakar + selai kacang + pisang", "Bubur ayam + kerupuk"],
        lunch: ["Nasi + rendang + sayur", "Mie ayam + pangsit", "Nasi gudeg + telur"],
        dinner: ["Nasi + ikan goreng + tempe", "Soto ayam + nasi", "Nasi + capcay + bakso"],
        snacks: ["Pisang goreng", "Kacang tanah", "Susu + biskuit"]
      }
    };

    const exercises = {
      low: {
        type: "Jalan Kaki & Stretching",
        duration: "30 menit",
        description: "Jalan santai di pagi/sore hari + peregangan ringan"
      },
      moderate: {
        type: "Jogging & Senam",
        duration: "25 menit", 
        description: "Jogging ringan + senam aerobik atau yoga"
      },
      high: {
        type: "HIIT & Gym",
        duration: "20 menit",
        description: "High Intensity Interval Training + angkat beban"
      }
    };

    const weeklyPlans = {
      losing: `Dalam ${weeks} minggu pertama: Defisit ${dailyCalorieAdjustment} kalori/hari, olahraga ${exercises[activityLevel as keyof typeof exercises].duration} rutin, minum 2.5L air, tidur 7-8 jam.`,
      gaining: `Dalam ${weeks} minggu pertama: Surplus ${dailyCalorieAdjustment} kalori/hari, fokus protein tinggi, olahraga ${exercises[activityLevel as keyof typeof exercises].duration}, istirahat cukup.`
    };

    const motivations = [
      "Konsistensi lebih penting daripada hasil instan. Semangat! 💪",
      "Perubahan kecil setiap hari = hasil besar di masa depan! 🌟", 
      "Tubuh sehat adalah investasi terbaik untuk hidup Anda! ❤️",
      "Jangan menyerah, hasil terbaik butuh proses. Keep going! 🚀"
    ];

    setResult({
      targetCalories,
      calorieAdjustment: dailyCalorieAdjustment,
      mealPlan: isLosing ? mealPlans.losing : mealPlans.gaining,
      exercise: exercises[activityLevel as keyof typeof exercises],
      weeklyPlan: isLosing ? weeklyPlans.losing : weeklyPlans.gaining,
      motivation: motivations[Math.floor(Math.random() * motivations.length)]
    });
  };

  const reset = () => {
    setCurrentWeight("");
    setTargetWeight("");
    setActivityLevel("");
    setTimeframe("");
    setBaseCalories("");
    setResult(null);
  };

  return (
    <Card className="bg-gradient-card border-health-recommendation/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-health-recommendation rounded-full flex items-center justify-center mb-2">
          <Target className="h-6 w-6 text-health-recommendation-foreground" />
        </div>
        <CardTitle className="text-health-recommendation">Smart Recommendation</CardTitle>
        <CardDescription>Dapatkan rekomendasi personal untuk mencapai target berat badan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="current-weight">Berat Saat Ini (kg)</Label>
            <Input
              id="current-weight"
              type="number"
              placeholder="65"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-weight">Target Berat (kg)</Label>
            <Input
              id="target-weight"
              type="number"
              placeholder="60"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label>Tingkat Aktivitas</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih aktivitas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Rendah</SelectItem>
                <SelectItem value="moderate">Sedang</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe">Target Waktu (minggu)</Label>
            <Input
              id="timeframe"
              type="number"
              placeholder="8"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="base-calories">Kebutuhan Kalori Normal (kcal/hari)</Label>
          <Input
            id="base-calories"
            type="number"
            placeholder="Masukkan hasil dari Calorie Calculator"
            value={baseCalories}
            onChange={(e) => setBaseCalories(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={generateRecommendation} 
            className="flex-1 bg-health-recommendation hover:bg-health-recommendation/90"
            disabled={!currentWeight || !targetWeight || !activityLevel || !timeframe || !baseCalories}
          >
            Buat Rekomendasi
          </Button>
          <Button variant="outline" size="icon" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {result && (
          <div className="space-y-4 mt-6">
            {/* Target Calories */}
            <div className="p-4 rounded-lg bg-health-recommendation/10 border border-health-recommendation/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-health-recommendation" />
                <h4 className="font-semibold text-health-recommendation">Target Kalori Harian</h4>
              </div>
              <p className="text-2xl font-bold text-health-recommendation">{result.targetCalories} kcal</p>
              <p className="text-sm text-muted-foreground">
                {result.calorieAdjustment > 0 ? `Surplus ${result.calorieAdjustment} kalori` : `Defisit ${Math.abs(result.calorieAdjustment)} kalori`} dari kebutuhan normal
              </p>
            </div>

            {/* Meal Plan */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-health-recommendation/5 to-health-recommendation/10 border border-health-recommendation/20">
              <div className="flex items-center gap-2 mb-3">
                <Apple className="h-5 w-5 text-health-recommendation" />
                <h4 className="font-semibold text-health-recommendation">Jadwal Makan Harian</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-medium text-health-recommendation mb-1">🌅 Sarapan:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.mealPlan.breakfast.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-health-recommendation mb-1">☀️ Makan Siang:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.mealPlan.lunch.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-health-recommendation mb-1">🌙 Makan Malam:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.mealPlan.dinner.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-health-recommendation mb-1">🍎 Snack Sehat:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.mealPlan.snacks.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Exercise Plan */}
            <div className="p-4 rounded-lg bg-health-recommendation/10 border border-health-recommendation/20">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-health-recommendation" />
                <h4 className="font-semibold text-health-recommendation">Aktivitas Fisik</h4>
              </div>
              <p className="font-medium text-health-recommendation">{result.exercise.type} - {result.exercise.duration}</p>
              <p className="text-sm text-muted-foreground">{result.exercise.description}</p>
            </div>

            {/* Weekly Plan */}
            <div className="p-4 rounded-lg bg-health-recommendation/10 border border-health-recommendation/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-health-recommendation" />
                <h4 className="font-semibold text-health-recommendation">Rencana Mingguan</h4>
              </div>
              <p className="text-sm text-muted-foreground">{result.weeklyPlan}</p>
            </div>

            {/* Motivation */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-health-recommendation/10 to-success/10 border border-health-recommendation/20 text-center">
              <p className="text-health-recommendation font-medium italic">{result.motivation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartRecommendation;
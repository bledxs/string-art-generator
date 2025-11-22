// Server Component - Educators Use Case
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Circle, Code, Lightbulb } from 'lucide-react';

const useCases = [
  {
    title: 'Geometry & Mathematics',
    icon: Circle,
    description:
      'Teach radial symmetry, circles, angles, and coordinate systems through interactive string art.',
    benefits: [
      'Visualize mathematical concepts',
      'Hands-on learning experience',
      'Connects theory to art',
    ],
    gradeLevel: 'Grades 6-12',
    subjects: ['Geometry', 'Trigonometry', 'Algebra'],
  },
  {
    title: 'Algorithms & Programming',
    icon: Code,
    description:
      'Demonstrate greedy algorithms, optimization, and computational thinking without coding.',
    benefits: [
      'Introduce algorithmic thinking',
      'Visual problem-solving',
      'CS concepts made accessible',
    ],
    gradeLevel: 'Grades 9-12, College',
    subjects: ['Computer Science', 'Logic', 'Algorithms'],
  },
  {
    title: 'Art & Design',
    icon: Lightbulb,
    description:
      'Explore generative art, digital design, and the intersection of technology and creativity.',
    benefits: [
      'Digital art exploration',
      'Design principles in action',
      'Portfolio-ready projects',
    ],
    gradeLevel: 'All Levels',
    subjects: ['Art', 'Design', 'Digital Media'],
  },
  {
    title: 'STEAM Projects',
    icon: GraduationCap,
    description:
      'Integrate Science, Technology, Engineering, Art, and Math in one engaging project.',
    benefits: [
      'Cross-disciplinary learning',
      'Physical + digital creation',
      'Shareable student work',
    ],
    gradeLevel: 'Grades 4-12',
    subjects: ['STEAM', 'Maker Education', 'Project-Based Learning'],
  },
];

const lessonIdeas = [
  'Calculate pin positions using coordinate geometry',
  'Analyze line distribution patterns statistically',
  'Compare algorithmic approaches (greedy vs random)',
  'Design custom portraits with parameter constraints',
  'Build physical string art from generated templates',
  'Present mathematical proofs visually through art',
];

export function Educators() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            For Educators & Teachers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Transform abstract concepts into tangible visual experiences. String
            Art Generator bridges mathematics, computer science, and art—making
            complex topics engaging and accessible for students.
          </p>
          <Badge variant="outline" className="text-xs">
            🎓 Free for educational use
          </Badge>
        </CardContent>
      </Card>

      {/* Use Cases Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {useCases.map((useCase, idx) => {
          const Icon = useCase.icon;
          return (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {useCase.gradeLevel}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>

                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Educational Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {useCase.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-sm mb-2">Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.subjects.map((subject, sidx) => (
                      <Badge key={sidx} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lesson Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Plan Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {lessonIdeas.map((idea, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="mt-0.5 h-6 w-6 flex items-center justify-center p-0"
                >
                  {idx + 1}
                </Badge>
                <span className="text-sm">{idea}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 border-blue-200 dark:border-blue-900">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-bold text-lg mb-1">
              Engage students with hands-on math & art
            </h3>
            <p className="text-sm text-muted-foreground">
              Try it in your classroom—100% free, no sign-up required.
            </p>
          </div>
          <Link href="/tutorials">
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              View Teaching Resources
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

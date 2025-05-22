import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const StepTracker: React.FC = () => {
  const steps = 2126;
  const goal = 10000;
  const progress = (steps / goal) * 100;
  const miles = 0.99;
  const calories = 27;
  const floors = 2;

  const weeklyData = [
    { day: 'SUN', steps: 3200, active: false },
    { day: 'MON', steps: 5800, active: false },
    { day: 'TUE', steps: 2126, active: true },
    { day: 'WED', steps: 0, active: false },
    { day: 'THU', steps: 0, active: false },
    { day: 'FRI', steps: 0, active: false },
    { day: 'SAT', steps: 0, active: false },
  ];

  const CircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const size = 200;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.circularContainer}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2a2a2a"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#ff6b35" />
              <Stop offset="50%" stopColor="#f7931e" />
              <Stop offset="100%" stopColor="#ffd700" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.centerContent}>
          <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
          <Text style={styles.stepLabel}>STEPS</Text>
        </View>
      </View>
    );
  };

  const WeeklyChart: React.FC = () => {
    const maxSteps = Math.max(...weeklyData.map(d => d.steps));
    return (
      <View style={styles.weeklyContainer}>
        {weeklyData.map((day, index) => {
          const height = maxSteps > 0 ? (day.steps / maxSteps) * 40 : 0;
          return (
            <View key={index} style={styles.dayContainer}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: height,
                      backgroundColor: day.active
                        ? '#4CAF50'
                        : day.steps > 0
                        ? '#4CAF50'
                        : '#2a2a2a',
                    },
                  ]}
                />
              </View>
              <Text style={[styles.dayLabel, day.active && styles.activeDayLabel]}>
                {day.day}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.progressSection}>
          <CircularProgress progress={progress} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="walk" size={20} color="#fff" />
            <Text style={styles.statValue}>{miles}</Text>
            <Text style={styles.statLabel}>MILES</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color="#fff" />
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>KCAL</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={20} color="#fff" />
            <Text style={styles.statValue}>{floors}</Text>
            <Text style={styles.statLabel}>FLOORS</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <WeeklyChart />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  progressSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  circularContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepCount: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  stepLabel: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  chartSection: {
    marginBottom: 40,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    height: 80,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 50,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  bar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  activeDayLabel: {
    color: '#4CAF50',
  },
});

export default StepTracker;

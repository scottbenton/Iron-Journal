import { Datasworn } from "@datasworn/core";
import { HomebrewConditionMeterDocument } from "api-calls/homebrew/rules/conditionMeters/_homebrewConditionMeters.type";
import { HomebrewImpactCategoryDocument } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";
import { HomebrewLegacyTrackDocument } from "api-calls/homebrew/rules/legacyTracks/_homebrewLegacyTrack.type";
import { HomebrewStatDocument } from "api-calls/homebrew/rules/stats/_homebrewStat.type";

export function constructRules(
  homebrewStats: Record<string, HomebrewStatDocument>,
  homebrewConditionMeters: Record<string, HomebrewConditionMeterDocument>,
  homebrewImpactCategories: Record<string, HomebrewImpactCategoryDocument>,
  homebrewLegacyTracks: Record<string, HomebrewLegacyTrackDocument>
): Datasworn.RulesExpansion {
  const stats: Record<string, Datasworn.StatRule> = {};
  Object.entries(homebrewStats).forEach(([id, stat]) => {
    stats[id] = {
      label: stat.label,
      description: stat.description ?? "",
    };
  });

  const conditionMeters: Record<string, Datasworn.ConditionMeterRule> = {};
  Object.entries(homebrewConditionMeters).forEach(([id, conditionMeter]) => {
    conditionMeters[id] = {
      label: conditionMeter.label,
      description: conditionMeter.description ?? "",
      min: conditionMeter.min,
      max: conditionMeter.max,
      shared: conditionMeter.shared,
      value: conditionMeter.value,
      rollable: true, // TODO - check in with rsek to see if this is correct
    };
  });

  const impactCategories: Record<string, Datasworn.ImpactCategory> = {};
  Object.entries(homebrewImpactCategories).forEach(([id, impactCategory]) => {
    const impacts: Record<string, Datasworn.ImpactRule> = {};
    Object.entries(impactCategory.contents).forEach(([id, impact]) => {
      impacts[id] = {
        label: impact.label,
        description: impact.description ?? "",
        shared: impact.shared,
        prevents_recovery: impact.preventsRecovery,
        permanent: impact.permanent,
      };
    });
    impactCategories[id] = {
      label: impactCategory.label,
      description: impactCategory.description ?? "",
      contents: impacts,
    };
  });

  const specialTracks: Record<string, Datasworn.SpecialTrackRule> = {};
  Object.entries(homebrewLegacyTracks).forEach(([id, legacyTrack]) => {
    specialTracks[id] = {
      label: legacyTrack.label,
      description: legacyTrack.description ?? "",
      shared: legacyTrack.shared,
      optional: legacyTrack.optional,
    };
  });

  const rules: Datasworn.RulesExpansion = {
    stats,
    condition_meters: conditionMeters,
    impacts: impactCategories,
    special_tracks: specialTracks,
  };
  return rules;
}
